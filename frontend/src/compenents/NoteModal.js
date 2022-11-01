import axios from "axios";
import { useState } from "react";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { MainContext, useContext } from "../context";

const NoteModal = ({ toggle, modalAcikMi }) => {
  const { modalSendNote } = useContext(MainContext);
  const [degisenTitle, setDegisenTitle] = useState(modalSendNote.title);
  const [degisenDetail, setDegisenDetail] = useState(modalSendNote.detail);
  const [degisenId, setDegisenId] = useState(modalSendNote.id);
  const noteSave = () => {
    const saveNote = {
      title: degisenTitle,
      note_detail: degisenDetail,
      id: degisenId,
    };
    axios.post("http://127.0.0.1:80/note/edit", saveNote).then((res) => {
      console.log(res);
    });
  };
  // console.log(nots); doğru
  // console.log(newnot.id);  doğru
  // console.log(newnot.title); dpğru
  // setSaveNote(saveNote);
  // setTitle(newnot.title);
  // setDetail(newnot.detail);
  // console.log(nots[0].id);
  // console.log(noteSave.title);

  return (
    <>
      <Modal
        key={Math.floor(Math.random() * 999999)}
        isOpen={modalAcikMi}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>'ı değiştiriyorsun.</ModalHeader>

        <ModalBody>
          <Label>Title</Label>
          <Input
            value={degisenTitle}
            onChange={(e) => setDegisenTitle(e.target.value)}
          />
          <Label>Detail</Label>
          <Input
            value={degisenDetail}
            onChange={(e) => setDegisenDetail(e.target.value)}
          />
        </ModalBody>
        <ModalFooter></ModalFooter>
        <Button onClick={() => noteSave()} color="primary">
          Save
        </Button>
      </Modal>
    </>
  );
};
export default NoteModal;
