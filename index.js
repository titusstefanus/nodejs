const express = require("express")
const { DataTypes } = require("sequelize")
const app = express()
const sequelize = require("./models/index").sequelize
const User = require("./models/user")


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post("/create_user", async (req, res) => {
    const data = await User(sequelize, DataTypes).create(
        {
            nama: req.body.nama,
            kelas: req.body.kelas,
            jurusan: req.body.jurusan
        }
    )
    return res.status(201).json({ message: "success created user", data: data })
})

app.get("/get_user", async (req, res) => {
    const data = await User(sequelize, DataTypes).findAll({})
    res.status(201).json({ message: "success get all user", data: data })
})

app.put("/edit_user/:id", async (req, res) => {
    const data = await User(sequelize, DataTypes).update(
        {
            nama: req.body.nama,
            kelas: req.body.kelas,
            jurusan: req.body.jurusan
        },
        {
            where: { id: req.params.id },
        }
    )
    return res.status(201).json({ message: "success created user", data: data })
})

app.delete("/delete_user/:id", async (req, res) => {
    await User(sequelize, DataTypes).destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: "user berhasil di hapus" })
})

app.listen(2000, console.log("Listening at " + 2000))