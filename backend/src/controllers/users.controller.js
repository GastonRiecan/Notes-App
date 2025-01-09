import User from "../models/User.js"
const userCtrl = {}

userCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    if (!users) {
        console.log("No hay usuarios registrados");
    }
    res.json(users)
}

userCtrl.createUser = async (req, res) => {
    const { username } = req.body;
    const newUser = new User({ username })
    await newUser.save();
    res.json({ message: "User created" })
}

userCtrl.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Usuario eliminado exitosamente", deletedUser });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ message: "Error al eliminar usuario", error });
    }
};


export { userCtrl }