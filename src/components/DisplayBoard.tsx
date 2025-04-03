"use client";

import { Board } from "@/models/board";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

async function getBoard(roomId: string): Promise<Board | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}express/board/${roomId}`,
    {
      cache: "no-store",
    }
  );
  console.log(res);
  if (!res.ok) return null;
  return res.json();
}

export default function DisplayBoard() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id ?? "";
  const [board, setBoard] = useState<Board | null>(null);

  useEffect(() => {
    async function fetchBoard() {
      const fetchedBoard = await getBoard(id);
      setBoard(fetchedBoard);
      console.log(fetchedBoard);
    }

    fetchBoard();
  }, [id]);

  return (
    <div>
      {board && (
        <ul className="gameInfo">
          <li>current turn: {board.currentTurn}</li>
          <li>last dice result: {board.lastDiceResult}</li>
        </ul>
      )}
    </div>
  );
}
