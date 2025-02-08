module.exports = {
    categories: { type: String, enum: ["Pet", "Sport", "Running", "Fountain"]},
    user_level: { type: String, enum: ["Admin", "Client"]},
    status_level: {type: String, enum: ["Inserita", "Presa in Carico", "Chiusa"]}
}
