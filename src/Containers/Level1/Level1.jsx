import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import OptionButton from "../../components/optionSelectionButton/optionSelectionButton";
import Scenario from "../../Data/Scenario1.json";
import Graph from "../../Graph/Graph";
import NarativeBox from "../../components/narativeBox/narativeBox";

class level1 extends Component {
  state = {
    currentNode: 0,
    tree: "tree0"
  };

  optionButtonClickHandler = ID => {
    console.log("Button clicked");
    const current = ID;
    this.setState({ currentNode: current });
    let image = this.state.tree;
    image += ID;
    this.setState({ tree: image });
  };

  // https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack function influenced by this person
  importAll = r => {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  };

  onHoverIn = ID => {};

  onHoverOut = ID => {};

  render() {
    console.log(JSON.parse(JSON.stringify(Scenario)));
    //const graph = new Graph(7);
    const vertices = JSON.parse(JSON.stringify(Scenario));
    const images = this.importAll(
      require.context("./images", false, /\.(png|jpe?g|svg)$/)
    );

    const buttons = [];
    for (
      let i = 0;
      i < vertices.nodes[this.state.currentNode].Edges.length;
      i++
    ) {
      buttons.push(
        <div>
          <OptionButton
            click={this.optionButtonClickHandler.bind(
              this,
              vertices.nodes[this.state.currentNode].Edges[i].ID
            )}
            text={vertices.nodes[this.state.currentNode].Edges[i].OptionText}
          />
        </div>
      );
    }

    let image = this.state.tree;
    if (image.indexOf("0" !== 4)) console.log(image);
    // if (image.includes(999)) {
    //   image = "tree0;";
    //   this.setState({ currentNode: 0 });
    //   this.setState({ tree: image });
    // }
    image += ".png";

    return (
      <>
        <Row className="d-flex flex-row align-self-center p-2 h-100">
          <Col className="d-flex flex-column align-self-center">
            {/* <img src={images[image]} /> */}
            <img src={images[vertices.nodes[this.state.currentNode].Image]} />
          </Col>

          <Col>
            <NarativeBox
              text={vertices.nodes[this.state.currentNode].Description}
            />
            {buttons}
          </Col>
        </Row>
      </>
    );
  }
}

export default level1;
