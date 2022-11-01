import React, { useState } from "react";
import { Col, Container, Nav, Navbar, NavItem, NavLink, Row } from "reactstrap";

const NavComponent = () => {
  return (
    <div className="">
      <Container>
        <Navbar>
          <Nav className="me-auto" navbar>
            <Row>
              <Col sm="6">
                <NavItem>
                  <NavLink href="/">Notları Listele</NavLink>
                </NavItem>
              </Col>
              <Col sm="6">
                <NavItem>
                  <NavLink href="/notlariekle">Notları Ekle</NavLink>
                </NavItem>
              </Col>
            </Row>
          </Nav>
        </Navbar>
      </Container>
    </div>
  );
};

export default NavComponent;
