import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  __updateWorries,
  __deleteWorries,
  __getWorries,
} from "../redux/modules/worrySlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CommonButton from "./elements/CommonButton";

const WorryDetail = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, worries } = useSelector((state) => state.worries);
  const [targetId, setTargetId] = useState(null);
  const [editWorry, setEditWorry] = useState(false);
  const worry = worries.filter((worry) => worry.id == +id);
  const [post, setPost] = useState({ id: id });

  useEffect(() => {
    dispatch(__getWorries());
  }, [dispatch]);

  function MultilineTextFields() {
    const [value, setValue] = React.useState("Controlled");

    const handleChange = (event) => {
      setValue(event.target.value);
    };
  }

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const onClickDeleteButtonHandler = (WorryId) => {
    dispatch(__deleteWorries(WorryId));
  };

  const onClickEditButtonHandler = () => {
    setEditWorry(!editWorry);
    // dispatch(updateWorry(id));
  };

  const onClickEditCompleteHandler = () => {
    console.log("수정완료버튼 동작");
    dispatch(__updateWorries(post));
    setEditWorry(!editWorry);
  };

  const editHandler = (e) => {
    const { value, name } = e.target;
    setPost({ ...post, id: id, [name]: value });
  };
  console.log("post", post);
  return (
    <>
      <StId>
        <StUser>
          <span> ID : {id} </span>
          <span>
            작성자 : {""}
            {worries?.map((worry) => {
              if (worry.id == id) return worry.user;
            })}
          </span>
          <span>
            {worries?.map((worry) => {
              if (worry.id == id) return worry.date;
            })}
          </span>
        </StUser>

        <CommonButton
          onClick={() => navigate("/list")}
          text="이전으로"
          variant="outlined"
          margin="0"
        />
      </StId>

      <div>
        {worries?.map((worry) => {
          if (worry.isDone === false && worry.id == id) {
            return (
              <div key={worry.id}>
                {" "}
                {editWorry ? (
                  <div>
                    <div>
                      <StTextareaTitle
                        onChange={editHandler}
                        defaultValue={worry.title}
                        name="title"
                      />
                    </div>{" "}
                    <div>
                      <StTextarea
                        onChange={editHandler}
                        defaultValue={worry.content}
                        name="content"
                      />
                    </div>
                    <StButtonDiv>
                      <CommonButton
                        text="수정완료"
                        variant="outlined"
                        margin="0"
                        onClick={() => {
                          onClickEditCompleteHandler(worry.id);
                        }}
                      />
                    </StButtonDiv>
                  </div>
                ) : (
                  <div>
                    {" "}
                    <StTitle>{worry.title}</StTitle>
                    <StContent>{worry.content}</StContent>
                    <StButtonDiv>
                      <CommonButton
                        text="수정하기"
                        variant="outlined"
                        margin="0"
                        onClick={() => {
                          onClickEditButtonHandler();
                        }}
                      />
                      <CommonButton
                        text="삭제하기"
                        variant="outlined"
                        margin="0"
                        onClick={() => {
                          onClickDeleteButtonHandler(worry.id);
                          navigate("/list");
                        }}
                      />
                    </StButtonDiv>
                  </div>
                )}
              </div>
            );
          }
          if (worry.isDone === true && worry.id == id) {
            return (
              <StEditContent key={worry.id}>
                <StBox
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "108ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-multiline-static"
                    label="제목 수정"
                    multiline
                    rows={1}
                    defaultValue={worry.title}
                  />{" "}
                  <TextField
                    id="outlined-multiline-static"
                    label="게시글 수정"
                    multiline
                    rows={10}
                    defaultValue={worry.content}
                  />
                </StBox>
                <StButtonDiv>
                  <StButton
                    id={id}
                    onClick={() => {
                      setEditWorry({ ...worry, isDone: false });
                      onClickEditButtonHandler(editWorry);
                    }}
                  >
                    수정완료
                  </StButton>
                </StButtonDiv>
              </StEditContent>
            );
          }
        })}
      </div>
    </>
  );
};

export default WorryDetail;

const StId = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 20px auto;
`;

const StUser = styled.div`
  display: flex;
  flex-direction: column;
`;

const StTitle = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  height: 50px;
  margin: 20px auto;
  text-align: center;
`;

const StContent = styled.div`
  border: 1px solid black;
  border-radius: 6px;
  height: 250px;
  margin: 20px auto;
  text-align: center;
`;

const StButton = styled.button`
  padding: 10px;
`;

const StButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  margin: 0px auto;
`;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StEditContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const StTextarea = styled.textarea`
  width: 100%;
  height: 250px;
  box-sizing: border-box;
`;

const StTextareaTitle = styled.textarea`
  width: 100%;
  height: 50px;
  box-sizing: border-box;
`;
