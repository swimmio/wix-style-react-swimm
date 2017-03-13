import React from 'react';
import {Container, Row, Col, Card} from '../../src/Grid'
import styles from './ExampleGrid.scss'

import TextField from '../../src/TextField';
import Input from '../../src/Input';
import Label from '../../src/Label';
import {Plus, ArrowDownThin} from '../../src/Icons/dist';
import Tooltip from '../../src/Tooltip';

function renderStandardInput() {
  return (
    <TextField>
      <Label
        for="textField"
      >
        Text Field
      </Label>
      <Input
        id="textField"
        placeholder="Default text goes"
      />
    </TextField>
  );
}

export default () =>
  <div data-hook="card-example" className={styles.exampleContainer}>
    <Container>
      <Row>
        <Col span={8}>
          <Card>
            <Card.Header withoutDivider subtitle="subtitle" title="Header without Divider"/>
            <Card.Content>
              <Row>
                <Col span={4}>
                  {renderStandardInput()}
                </Col>
                <Col span={4}>
                  {renderStandardInput()}
                </Col>
                <Col span={4}>
                  {renderStandardInput()}
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  {renderStandardInput()}
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  {renderStandardInput()}
                </Col>
                <Col span={3}>
                  {renderStandardInput()}
                </Col>
                <Col span={3}>
                  {renderStandardInput()}
                </Col>
              </Row>
            </Card.Content>
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Card.Header title="Side Card"/>
            <Card.Content>
              <Row>
                <Col span={12}>
                  {renderStandardInput()}
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  {renderStandardInput()}
                </Col>
                <Col span={6}>
                  {renderStandardInput()}
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  {renderStandardInput()}
                </Col>
              </Row>
            </Card.Content>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Card>
            <Card.Header  title="Main card" subtitle="Subtitle"/>
            <Card.Content>
              <Row>
                <Col span={4}>
                  {renderStandardInput()}
                </Col>
                <Col span={4}>
                  {renderStandardInput()}
                </Col>
                <Col span={4}>
                  {renderStandardInput()}
                </Col>
              </Row>
            </Card.Content>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col span={6}>
          <Card>
            <Card.Header title="Card Header"/>
            <Card.Content>
              <Row>
                <Col span={4}>
                  {renderStandardInput()}
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  {renderStandardInput()}
                </Col>
                <Col span={6}>
                  {renderStandardInput()}
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  {renderStandardInput()}
                </Col>
              </Row>
            </Card.Content>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Card.Header title="Card header"/>
            <Card.Content>
              <Row>
                <Col span={4}>
                  {renderStandardInput()}
                </Col>
                <Col span={4}>
                  {renderStandardInput()}
                </Col>
                <Col span={4}>
                  {renderStandardInput()}
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  {renderStandardInput()}
                </Col>
                <Col span={6}>
                  {renderStandardInput()}
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  {renderStandardInput()}
                </Col>
              </Row>
            </Card.Content>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col span={4}>
          <Card>
            <Card.LinkHeader linkTo= 'http://www.wix.com/' linkTitle= 'Link to Wix' title= 'Card with link'/>
            <Card.Content>
              <Row>
                <Col span={12}>
                  {renderStandardInput()}
                </Col>
              </Row>
            </Card.Content>
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Card.LinkHeader
              tooltip={<Tooltip placement="top" alignment="center" content="Hi there!"/>}
              title='Card header'
              linkTo='http://www.wix.com/'
              linkTitle= 'Tooltip link!'
              subtitle='Subtitle'/>
            <Card.Content>
              <Row>
                <Col span={6}>
                  {renderStandardInput()}
                </Col>
              </Row>
            </Card.Content>
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Card.ButtonHeader title="Card header" subtitle="Card subtitle" buttonOnClick={() => {alert('Clicked!')}} buttonTitle='Click Me!'/>
            <Card.Content>
              <Row>
                <Col span={6}>
                  {renderStandardInput()}
                </Col>
                <Col span={6}>
                  {renderStandardInput()}
                </Col>
              </Row>
            </Card.Content>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <Card>
            <Card.ButtonHeader title="Card header" buttonOnClick={() => {alert('Clicked!')}} buttonPrefix={<Plus/>} buttonTitle='Click Me!'/>
            <Card.Content>
              <Row>
                <Col span={12}>
                  {renderStandardInput()}
                </Col>
              </Row>
            </Card.Content>
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Card.ButtonHeader title="Card header" buttonOnClick={() => {alert('Clicked!')}} buttonSuffix={<ArrowDownThin/>} buttonTitle='Click Me!'/>
            <Card.Content>
              <Row>
                <Col span={6}>
                  {renderStandardInput()}
                </Col>
              </Row>
            </Card.Content>
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Card.ButtonHeader withoutDivider title="Card header" subtitle="No divider" buttonOnClick={() => {alert('Clicked!')}} buttonPrefix={<ArrowDownThin/>} buttonTitle='Click Me!'/>
            <Card.Content>
              <Row>
                <Col span={6}>
                  {renderStandardInput()}
                </Col>
                <Col span={6}>
                  {renderStandardInput()}
                </Col>
              </Row>
            </Card.Content>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Card>
            <Card.ButtonHeader
              tooltip={<Tooltip placement="top" alignment="center" content="Hi there!"/>}
              title="Card header no content"
              buttonOnClick={() => {alert('Clicked!')}}
              buttonPrefix={<Plus/>}
              buttonTitle='Tooltip button!'
              />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Card.ButtonHeader withoutDivider title="Card header no content" subtitle="No divider" buttonOnClick={() => {alert('Clicked!')}} buttonPrefix={<ArrowDownThin/>} buttonTitle='Click Me!'/>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>;
