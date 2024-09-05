"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableArea from "../components/DroppableArea";
import quizData from "../components/quizData.json";
import Stage3_1 from "/public/assets/images/Stage3_1.svg";
import Stage3_2 from "/public/assets/images/Stage3_2.svg";
import Stage3_3 from "/public/assets/images/Stage3_3.svg";
import Stage3_4 from "/public/assets/images/Stage3_4.svg";
import Stage3_5 from "/public/assets/images/Stage3_5.svg";
import three01 from "/public/assets/prog/three01.svg";
import three02 from "/public/assets/prog/three02.svg";
import three03 from "/public/assets/prog/three03.svg";
import three04 from "/public/assets/prog/three04.svg";
import three05 from "/public/assets/prog/three05.svg";
import Correct from "/public/assets/images/Correct.svg";
import Incorrect from "/public/assets/images/Incorrect.svg";
import { useUsername } from "../context/UsernameContext";
import { saveScore } from "../lib/saveScore";

const Stage3 = () => {
  const { username, score, setScore } = useUsername();
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [proggres, setProggres] = useState(three01);
  const [alert, setAlert] = useState(Incorrect);
  const [image, setImage] = useState(Stage3_1);
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState();
  const [color, setColor] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!username) {
      router.push("/");
    }
  }, [username, router]);
  
  useEffect(() => {
    // Fetch and set the questions from the imported JSON file
    setQuestions(quizData.questions2);
    // Set the initial options based on the first question
    setOptions(quizData.questions2[0].options);
  }, []);
  useEffect(() => {
    if (currentQuestionIndex === 1) {
      setProggres(three02);
      setImage(Stage3_2);
    } else if (currentQuestionIndex === 2) {
      setProggres(three03);
      setImage(Stage3_3);
    } else if (currentQuestionIndex === 3) {
      setProggres(three04);
      setImage(Stage3_4);
    } else if (currentQuestionIndex === 4) {
      setProggres(three05);
      setImage(Stage3_5);
    }
  }, [currentQuestionIndex]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const draggedItemId = result.draggableId;

    if (source.droppableId === destination.droppableId) {
      // Reorder the items within the same droppable area
      if (source.droppableId === "droppable-options") {
        const updatedOptions = Array.from(options);
        const [removed] = updatedOptions.splice(source.index, 1);
        updatedOptions.splice(destination.index, 0, removed);
        setOptions(updatedOptions);
      }
      return;
    }

    // Handle moving items between answer and options

    if (
      source.droppableId === "droppable-options" &&
      destination.droppableId === "droppable-answer"
    ) {
      const draggedItem = options.find((item) => item.id === draggedItemId);
      setOptions((prevOptions) =>
        prevOptions.filter((item) => item.id !== draggedItemId)
      );

      if (answers.length === 0) {
        setAnswers([draggedItem]);
      } else {
        const replacedItem = answers[0];
        setOptions((prevOptions) => [...prevOptions, replacedItem]);
        setAnswers([draggedItem]);
      }
    }

    if (
      source.droppableId === "droppable-answer" &&
      destination.droppableId === "droppable-options"
    ) {
      const draggedItem = answers.find((item) => item.id === draggedItemId);
      setAnswers([]);
      setOptions((prevOptions) => {
        const newOptions = [...prevOptions];
        newOptions.splice(destination.index, 0, draggedItem);
        return newOptions;
      });
    }

    if (
      source.droppableId === "droppable-answer" &&
      destination.droppableId === "droppable-answer"
    ) {
      const draggedItem = answers.find((item) => item.id === draggedItemId);
      setAnswers([draggedItem]);
    }
  };

  const nextStage = async () => {
    if (loading) return; 

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setOptions(questions[currentQuestionIndex + 1].options); 
      setAnswers([]); 
    } else {
      setLoading(true);
      try {
        await saveScore(username, score);
        router.push('/finished');
      } finally {
        setLoading(false); 
      }
    }
  };

  const verifyAnswerAndMoveToNext = () => {
    if (answers.length === 0) {
      setAlert(Incorrect);
      setText("Please select an answer before proceeding.");
      setColor("#F19C9C");
      return;
    }
    if (answers.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      const selectedAnswerId = answers[0].id;
      if (currentQuestion.correctAnswerId === selectedAnswerId) {
        setScore((score) => score + 1);
        setAlert(Correct);
        setText("ikan hiu makan badak i love you mendadak");
        setColor("#B9DEBD");
      } else {
        setAlert(Incorrect);
        setText("Dih Payah!!!");
        setColor("#F19C9C");
      }
    }
    setShowModal(true);
  };

  return (
    <div className="flex flex-col items-center max-w-xs mx-auto mt-8">
      <Image src={proggres} alt="Proggresion Bar" className="px-2 mb-4" />
      <div className="flex items-center justify-center">
        <Image src={image} alt="Ilustrasi ekspresi" width={140} />
        <div className="ml-2">
          {questions.length > 0 && (
            <h3 className=" bg-[#c2b29b] max-w-[170px] w-fit text-stone-600 text-xs rounded-bl-3xl rounded-r-3xl  px-3 py-2">
              {questions[currentQuestionIndex].content}
            </h3>
          )}
          {questions.length > 0 && questions[currentQuestionIndex].content1 && (
            <h3 className=" bg-[#c2b29b] max-w-[170px] text-stone-600 text-xs  rounded-[12px] px-2 py-2 mt-2">
              {questions[currentQuestionIndex].content1}
            </h3>
          )}
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="w-[320px] h-[64px]  bg-[#f1f1f1] rounded-xl overflow-hidden border-[3px] border-dashed border-white px-2 py-1.5 relative">
          <DroppableArea
            droppableId="droppable-answer"
            items={answers}
            title="Answer"
          />
          <p
            className={`absolute inset-0 flex items-center justify-center font-extrabold my-2 pointer-events-none bg-gradient-to-r from-[#413E36] to-[#C2B29B] text-transparent bg-clip-text opacity-70 ${
              answers.length > 0 ? "hidden" : ""
            }`}
          >
            Drag Here
          </p>
        </div>
        <div className="bg-[#c2b29b] rounded-xl mt-1.5 px-2.5 py-4 h-[302px] ">
          <div className="absolute">
            <DroppableArea
              droppableId="droppable-options"
              items={options}
              title="Options"
            />
          </div>
          <button
            onClick={() => {
              verifyAnswerAndMoveToNext();
            }}
            type="button"
            className="text-center mt-[224px] text-white bg-[#403d35] w-[298px] h-[48px] rounded-[12px] shadow-[0px_4px_4px_#00000040]"
          >
            CHECK
          </button>
        </div>
      </DragDropContext>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overfloh-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-[320px]">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#F8F2E3] outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 rounded-t"></div>
                <div className="relative px-6 py-4 ml-9 flex-auto ">
                  <Image src={alert} alt="Expression" />
                </div>
                <p className="text-[#5F5B50] text-lg leading-relaxed w-full px-8 pb-3">
                  {text}
                </p>
                <div
                  className="flex justify-center items-center rounded-b-lg rounded-t-2xl"
                  style={{ backgroundColor: color }}
                >
                  <div className="relative items-center justify-center p-6 rounded-b ">
                    <button
                      disabled={loading}
                      className="bg-[#5f5b50] rounded-[37px] text-white uppercase text-sm px-8 py-2 shadow-lg hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        nextStage();
                      }}
                    >
                      NEXT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default Stage3;
