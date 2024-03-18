"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Loading from "./Loading";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      try {
        const response = await fetch("http://localhost:4000/recipes");
        const data = await response.json(); // Parse the JSON response

        setRecipes(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure effect runs only once

  return (
    <>
      {loading && <Loading />}
      <main>
        <div className="grid grid-cols-3 gap-8">
          {recipes &&
            recipes.map((recipe) => (
              <Card key={recipe.id} className="flex flex-col justify-between">
                <CardHeader className="flex-row gap-4 items-center">
                  <Avatar>
                    <AvatarImage src={`/img/${recipe.image}`} alt="@shadcn" />
                    <AvatarFallback>{recipe.title.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{recipe.title}</CardTitle>
                    <CardDescription>{recipe.time} mins to cook.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{recipe.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button>View Recipe</Button>
                  {recipe.vegan && <Badge variant="secondary">Vegan!</Badge>}
                </CardFooter>
              </Card>
            ))}
        </div>
      </main>
    </>
  );
}
