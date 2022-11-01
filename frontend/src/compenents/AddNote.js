import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Input, InputGroup, Row } from "reactstrap";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const addNote = () => {
    const note = { title: title, note_detail: detail };
    console.log(note);

    axios.post("http://127.0.0.1:80/note/create", note).then((res) => {
      console.log(res);
      if (res.data.status === 200) {
        alert("not eklendi");
        setDetail("");
        setTitle("");
      }
    });
  };
  return (
    <Container>
      <Row>
        <Col className="offset-2" sm="2">
          Not Başlığı
        </Col>
        <Col sm="6">
          <InputGroup>
            <Input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="offset-2" sm="2">
          Not Detayı
        </Col>
        <Col sm="6">
          <InputGroup>
            <Input
              value={detail}
              onChange={(e) => {
                setDetail(e.target.value);
              }}
              type="textarea"
            />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col sm="10">
          <div className="d-flex justify-content-end ">
            <Button onClick={() => addNote()} className="mt-5" color="primary">
              Add Note
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default AddNote;
