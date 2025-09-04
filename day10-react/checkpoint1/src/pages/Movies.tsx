/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Product } from "../models/product";
import { Outlet } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { api } from "../services/api";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";

function MovieCardContainer({ children }: any) {
  return (
    <div className="py-30 grid grid-cols-3 gap-5 w-full justify-center">
      {children}
    </div>
  );
}

function MovieCard({ item }: any) {
  return (
    <Card className="w-96 flex flex-col items-center">
      <CardHeader className="w-full">
        <CardTitle className="font-bold">{item.Title}</CardTitle>
        <img
          className="w-full min-h-[500px]"
          src={item.Poster}
          alt={item.Title}
        />
        <CardDescription>Year: {item.Year}</CardDescription>
        <CardDescription>Runtime: {item.Runtime}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function Movies() {
  const [movies, setMovies] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await api.get("/movies");
        setMovies(res.data);
      } catch (error) {
        console.error("Gagal fetch data Movies", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-screen flex">
      {loading && (
        <>
          <p className="mt-10">Loading ...</p>
        </>
      )}

      {movies && !loading && (
        <MovieCardContainer>
          {movies.map((item, i) => (
            <Dialog>
              <DialogTrigger className="w-full">
                <MovieCard key={i} item={item} />
              </DialogTrigger>
              <DialogContent>
                <MovieCard key={i} item={item} />
              </DialogContent>
            </Dialog>
          ))}
        </MovieCardContainer>
      )}

      {movies === null && !loading && (
        <>
          <h2 className="mt-10">Movie not Found!</h2>
        </>
      )}
    </div>
  );
}

export default Movies;
