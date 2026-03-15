import validator from "validator"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js"


// ================= ADD DOCTOR =================

const addDoctor = async (req, res) => {

    try {

        console.log("===== ADD DOCTOR API HIT =====")

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        console.log("Request Body:", req.body)

        if (!imageFile) {
            console.log("No image uploaded")
            return res.json({ success: false, message: "Image file is required" })
        }

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            console.log("Missing fields")
            return res.json({ success: false, message: "Missing Details" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" })
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        console.log("Password hashed")

        // upload image
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })

        console.log("Image uploaded to Cloudinary")

        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: typeof address === "string" ? JSON.parse(address) : address,
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)

        const savedDoctor = await newDoctor.save()

        console.log("Doctor saved in DB:", savedDoctor._id)

        res.json({ success: true, message: "Doctor Added Successfully" })

    } catch (error) {

        console.log("ADD DOCTOR ERROR:", error)

        res.json({
            success: false,
            message: error.message
        })

    }

}


// ================= ADMIN LOGIN =================

const loginAdmin = async (req, res) => {

    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email + password, process.env.JWT_SECRET)

            res.json({ success: true, token })

        }
        else {

            res.json({ success: false, message: "Invalid credentials" })

        }

    }
    catch (error) {

        console.log(error)

        res.json({ success: false, message: error.message })

    }

}


// ================= ALL DOCTORS =================

const allDoctors = async (req, res) => {

    try {

        const doctors = await doctorModel.find({}).select('-password')

        console.log("Doctors fetched:", doctors.length)

        res.json({
            success: true,
            doctors
        })

    }
    catch (error) {

        console.log(error)

        res.json({ success: false, message: error.message })

    }

}


// ================= ALL APPOINTMENTS =================

const appointmentsAdmin = async (req, res) => {

    try {

        const appointments = await appointmentModel.find({})

        res.json({
            success: true,
            appointments
        })

    }
    catch (error) {

        console.log(error)

        res.json({ success: false, message: error.message })

    }

}


// ================= CANCEL APPOINTMENT =================

const appointmentCancel = async (req, res) => {

    try {

        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({
            success: true,
            message: "Appointment Cancelled"
        })

    }
    catch (error) {

        console.log(error)

        res.json({ success: false, message: error.message })

    }

}


// ================= DASHBOARD =================

const adminDashboard = async (req, res) => {

    try {

        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({
            success: true,
            dashData
        })

    }
    catch (error) {

        console.log(error)

        res.json({ success: false, message: error.message })

    }

}

export {
    addDoctor,
    loginAdmin,
    allDoctors,
    appointmentsAdmin,
    appointmentCancel,
    adminDashboard
}