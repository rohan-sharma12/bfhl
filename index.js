const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const response = {
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers: [],
        alphabets: [],
        highest_lowercase_alphabet: []
    };

    if (!Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: "Invalid input format, data should be an array."
        });
    }

    data.forEach(item => {
        if (!isNaN(item)) {
            response.numbers.push(item);
        } else if (typeof item === 'string') {
            response.alphabets.push(item);
            if (item >= 'a' && item <= 'z') {
                if (response.highest_lowercase_alphabet.length === 0 || item > response.highest_lowercase_alphabet[0]) {
                    response.highest_lowercase_alphabet[0] = item;
                }
            }
        }
    });

    res.json(response);
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
