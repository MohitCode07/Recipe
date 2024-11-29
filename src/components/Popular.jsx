import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import './Popular.css';
import { API_KEY } from '../assets/API_KEY';
import { Skeleton } from "@mui/material";

const Popular = () => {
    const [popular, setPopular] = useState([]);

    const getPopular = async () => {
        const check = localStorage.getItem('popular');

        if (check) {
            setPopular(JSON.parse(check));
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=15`);
            const data = await api.json();
            localStorage.setItem('popular', JSON.stringify(data.recipes));
            setPopular(data.recipes);
        }
    };

    useEffect(() => {
        getPopular();
    }, []);

    if (popular.length === 0) {
        return (
            <div className="popular-grid">
                {[...Array(15)].map((_, index) => (
                    <div key={index} className="card">
                        <Skeleton variant="rectangular" width="100%" height={200} />
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="text" width="40%" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="popular-container">
            <h1>Popular Recipes</h1>
            <div className="popular-grid">
                {popular.map((recipe) => (
                    <RecipeCard key={recipe.id} data={recipe} />
                ))}
            </div>
        </div>
    );
};

export default Popular;
