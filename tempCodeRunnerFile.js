app.delete('/biodata/:id', (req,res) => {
    const { id } = req.params;

    pool.query(
        'DELETE FROM biodata WHERE id=$1 RETURNING *',
        [id]
    )
    .then(result => {
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Data tidak ditemukan"
            });
        }
        res.json({
            message: "Data berhasil dihapus",
            data: result.rows[0]
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
});
