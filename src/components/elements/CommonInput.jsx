import styled from "styled-components";
import Input from "@mui/material/Input";

const ariaLabel = { "aria-label": "description" };

const CommonInput = ({ labeltext, text, id }) => {
  return (
    <StBox>
      <Stlabel for={id}>{labeltext}</Stlabel>
      <Input
        placeholder={text}
        inputProps={ariaLabel}
        sx={{ margin: "20px 0", width: "100%" }}
        id={id}
      />
    </StBox>
  );
};

export default CommonInput;

const StBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1%;
`;
const Stlabel = styled.label`
  font-size: 20px;
  font-weight: bold;
`;
