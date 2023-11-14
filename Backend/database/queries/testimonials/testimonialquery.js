import { pool } from '../../connexion.js'



// Get all testimonials
export const getTestimonials = async () => {
    try {
        const [rows] = await pool.query(`SELECT * FROM testimonials`)
        return rows
    } catch (error) {
        console.log(error)
    }
}

// Get one testimonial
export const getTestimonial = async (id) => {
    try {
        const [row] = await pool.query(`SELECT * FROM testimonials WHERE id = ?`, [id])
        return row[0];
    } catch (error) {
        console.log(error)
    }
}

// Create a testimonial
export const createTestimonial = async (testimonial) => {
    try {
        const result = await pool.query(`INSERT INTO testimonials (email, content, rating) 
        VALUES (?, ?, ?)`,
            [testimonial.email, testimonial.content, testimonial.rating])
        const newTestimonial = await getTestimonial(result.insertId);
        return newTestimonial;
    } catch (error) {
        console.log(error);
    }
}

// Update a testimonial
export const updateTestimonial = async (id, testimonial) => {
    try {
        const result = await pool.query(`
        UPDATE testimonials 
        SET email = ?, content = ?, rating = ? 
        WHERE id = ?`,
            [testimonial.email, testimonial.content, testimonial.rating, id])
        if(result){
            const updatedTestimonial = await getTestimonial(id);
            return updatedTestimonial;
        }
    } catch (error) {
        console.log(error);
    }
}

// Delete a testimonial
export const deleteTestimonial = async (id) => {
    try {
        const result = await pool.query(`DELETE FROM testimonials WHERE id = ?`, [id])
        return result;
    } catch (error) {
        console.log(error);
    }
}