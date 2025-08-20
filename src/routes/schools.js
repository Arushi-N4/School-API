const express = require('express');
const pool = require('../db');
const validate = require('../middleware/validate');
const { addSchoolSchema, listSchoolsSchema } = require('../validator/school');
const router = express.Router();


function distanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const toRad = (d) => (d * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

router.post('/addSchool', validate(addSchoolSchema), async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    try {
        const [result] = await pool.query(
            `INSERT INTO school (name, address, latitude, longitude)
            VALUES (?, ?, ?, ?)`,
            [name.trim(), address.trim(), latitude, longitude]
        );

        return res.status(201).json({
            ok: true,
            message: 'School added successfully',
            schoolId: result.insertId,
        });
    } catch (err) {
        console.error('Error inserting school', err);
        return res.status(500).json({ ok: false, message: 'Internal server error' });
    }
})

router.get('/listSchools', validate(listSchoolsSchema, 'query'), async (req, res) => {
    const { lat: userLat, lng: userLng } = req.query;
    try {
        const [rows] = await pool.query(
            `SELECT id, name, address, latitude, longitude FROM school`
        );
        const withDistance = rows.map((s) => ({
            ...s,
            distanceKm: Number(distanceKm(userLat, userLng, s.latitude, s.longitude).toFixed(3)),
        }));
        withDistance.sort((a, b) => a.distanceKm - b.distanceKm);
        return res.json(withDistance);
    } catch (err) {
        console.error('Error listing schools:', err);
        return res.status(500).json({ ok: false, message: 'Internal server error' });
    }
});

module.exports = router;