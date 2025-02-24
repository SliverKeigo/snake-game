import React from "react"
import type { GameState } from "../types/game"

interface GameScreenProps {
  gameState: GameState
}

export default function GameScreen({ gameState }: GameScreenProps) {
  return (
    <div className="w-72 h-[480px] rounded-lg bg-[#011627d6] flex flex-wrap shadow-inner shadow-black/50 lg:w-60 lg:h-[400px]">
      {Array.from({ length: 40 }, (_, i) =>
        Array.from({ length: 24 }, (_, j) => {
          const isFood = j === gameState.food.x && i === gameState.food.y
          const snakeSegment = gameState.snake.find((segment) => segment.x === j && segment.y === i)
          const isSnakeHead = snakeSegment && gameState.snake.indexOf(snakeSegment) === 0

          let cellClass = "w-3 h-3 flex-shrink-0 lg:w-2.5 lg:h-2.5 transition-opacity duration-500"
          if (isFood) {
            cellClass += " bg-[#43D9AD] rounded-full shadow-[0_0_10px_#43D9AD]"
          } else if (snakeSegment) {
            const snakeIndex = gameState.snake.indexOf(snakeSegment)
            const opacity = Math.max(0.1, 1 - (snakeIndex / (gameState.snake.length * 0.5)))
            cellClass += ` bg-[#43D9AD] opacity-[${opacity.toFixed(2)}]`
            if (isSnakeHead) {
              switch (gameState.direction) {
                case "up":
                  cellClass += " rounded-t-md"
                  break
                case "down":
                  cellClass += " rounded-b-md"
                  break
                case "left":
                  cellClass += " rounded-l-md"
                  break
                case "right":
                  cellClass += " rounded-r-md"
                  break
              }
            }
          }

          return <div key={`${i}-${j}`} className={cellClass} />
        }),
      )}
    </div>
  )
}

