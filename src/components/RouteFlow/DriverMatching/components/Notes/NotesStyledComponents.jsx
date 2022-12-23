import styled from 'styled-components';
import { MainBox, RouteFlowContainer } from 'scss/ComponentsUsedFrequently';
import * as C from 'scss/colors';

export const NotesContainer = styled(RouteFlowContainer)`
    display: flex;
    flex-direction: column;
    padding: 1rem 4rem;
`;

export const MessagesContainer = styled.div`
    height: 100%;
    overflow: auto;
`;

export const MessageBoxContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
`;

export const MessageBox = styled(MainBox)`
    padding: 1rem 3rem 2rem 2rem;
    background-color: white;
    border-radius: 2rem;
    color: rgba(116, 116, 116, 0.75);
    width: max-content;
    max-width: 100%;
    word-wrap: break-word;
`;

export const Message = styled.div`
`;

export const Time = styled.div`
    text-align: right;
    font-size: 1.4rem;
    margin-top: 1rem;;
    margin-left: 10rem;;
`;

export const NoteContainer = styled.div`
    margin-top: 3rem;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

export const ButtonsSubContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 50%;
`;

export const IconsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const NoteBox = styled(MainBox)`
    min-height: 20rem;
`;

export const Note = styled.textarea`
    width: 100%;
    min-height: 15rem;
    resize: none;
    overflow: hidden;
`;

export const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: rgba(190, 194, 204, 0.2);
    padding: 1rem;
    border-radius: 1rem;
    overflow: auto;
`;

export const Image = styled.img`
    max-height: 10rem;
    padding: 0 1rem;
`;

export const SendButton = styled.button`
    padding: 0.6rem;
    width: 100%;
    background-color: ${C.primaryOrange};
    color: white;
    border-radius: 2rem;
`;
