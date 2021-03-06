import CloseIcon from '@material-ui/icons/Close';
import { IBoard } from '../interface/Boards';
import { getUserBoards } from '../helpers/APICalls/boardApiCalls';
import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';

interface IBoardsContext {
  updateBoard: () => void;
  boards: IBoard[] | undefined;
}

export const BoardContext = createContext<IBoardsContext>({
  updateBoard: () => null,
  boards: undefined,
});

export const BoardProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [boards, setBoards] = useState<IBoardsContext['boards']>(undefined);
  const updateBoard = useCallback(async () => {
    await getUserBoards()
      .then((data) => {
        setBoards(data.boards);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    updateBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BoardContext.Provider
      value={{
        updateBoard,
        boards,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export function useBoard(): IBoardsContext {
  return useContext(BoardContext);
}
