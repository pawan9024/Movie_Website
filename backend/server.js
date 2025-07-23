import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
 
import { connectDB } from "./config/db.js"; 
import { protectRoute } from "./middleware/protectRoute.js";
 
import dotenv from 'dotenv'
const app = express();    
dotenv.config(); 


  
const port = process.env.PORT || 5000; 

app.use(express.json()); 
app.use(cookieParser());
app.use(cors()) 

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes); 
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);


app.get('/',(req,res)=>{
	res.send("Welcome to TMDB Application")
})
 
app.listen(port, () => {
	console.log("Server is Running PORT No. " + port);
	connectDB();
});
app.listen(port, '0.0.0.0', () => {
	console.log('Server running on port 5000');
  });
  
