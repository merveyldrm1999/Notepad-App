import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  Col,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap";
import NoteModal from "./NoteModal";
import { MainContext, useContext } from "../context";

// onClick={() => editNote()}

const NotCard = (props) => {
  const { nots, setNots } = useContext(MainContext);

  const [modalAcikMi, setModal] = useState(false);
  const [editTitle, setEditTitle] = useState("Editleneceği Seçin");
  const [editId, setEditId] = useState(-1);
  const [editDetail, setEditDetail] = useState("Editleneceği Seçin");

  // const toggle = () => setModal(!modalAcikMi);
  const setEditNote = (editNote) => {
    setEditDetail(editNote.note_detail);
    setEditTitle(editNote.title);
    setEditId(editNote.id);
  };
  useEffect(() => {
    axios.get(" http://127.0.0.1:80/not").then((res) => {
      setNots(res.data.not);
    });
  }, []);
  const noteSave = () => {
    if (editId === -1) {
      alert("Değiştirmek istediğinizi seçin");
      return;
    }
    const saveNote = {
      title: editTitle,
      note_detail: editDetail,
      id: editId,
    };
    console.log(saveNote);

    axios.post("http://127.0.0.1:80/note/edit", saveNote).then((res) => {
      if (res.status === 200) {
        alert("Düzenleme Başarılı");
        const newNot = nots.map((not) => {
          if (not.id === res.data.changeNot.id) {
            not.title = res.data.changeNot.title;
            not.note_detail = res.data.changeNot.note_detail;
          }
          return not;
        });
        setNots(newNot);
      }
    });
  };
  return (
    <Container>
      <Label>Title</Label>
      <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
      <Label>Detail</Label>
      <Input
        value={editDetail}
        onChange={(e) => setEditDetail(e.target.value)}
      />
      <Button onClick={() => noteSave()} color="primary">
        Save
      </Button>
      <Row>
        {nots.map((newnot) => {
          return (
            <Col sm="4" className="mt-3">
              <Card
                key={Math.floor(Math.random() * 999999)}
                className="ms-2"
                style={{
                  width: "18rem",
                }}
              >
                <CardHeader>{newnot.title}</CardHeader>
                <CardBody>
                  <CardText>{newnot.note_detail}</CardText>
                </CardBody>
                <CardFooter>{newnot.CreatedAt}</CardFooter>
                <Row>
                  <Col sm="6">
                    <div>
                      <Button
                        onClick={() => {
                          setEditNote(newnot);
                        }}
                        className="ms-5"
                      >
                        Edittt
                      </Button>
                    </div>
                  </Col>
                  <Col sm="6">
                    <Button>Delete</Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* <NoteModal
        modalSendNote={modalSendNote}
        toggle={toggle}
        modalAcikMi={modalAcikMi}
      /> */}
    </Container>
  );
};
export default NotCard;
