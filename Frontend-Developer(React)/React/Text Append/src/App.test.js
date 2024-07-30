import React from 'react';
import App from './App';
import {render, fireEvent, cleanup, within, getNodeText} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(() => {
    cleanup()
});

const renderApp = () => render(<App />);

test('initial UI is rendered as expected', () => {
    let { getByTestId, queryByTestId } = renderApp();

    const firstText = getByTestId('first-text');
    const secondText = getByTestId('second-text');
    const finalText = getByTestId('final-text');

    const firstTextLabel = within(firstText).getByTestId('label');
    const secondTextLabel = within(secondText).getByTestId('label');

    expect(getNodeText(firstTextLabel).trim()).toEqual('First Text');
    expect(getNodeText(secondTextLabel).trim()).toEqual('Second Text')
    expect(getNodeText(finalText).trim()).toBeFalsy();
});

test('Appended string is correct when First Text input changed', () => {
  let { getByTestId, queryByTestId } = renderApp();

  const firstText = getByTestId('first-text');
  const finalText = getByTestId('final-text');

  const firstTextInput = within(firstText).getByTestId('input');

  fireEvent.input(firstTextInput, {
      target: { value: 'John Oliver'}
  });
  
  expect(getNodeText(finalText).trim()).toEqual('John Oliver');
});

test('Appended string is correct when Second Text input changed', () => {
  let { getByTestId, queryByTestId } = renderApp();

  const secondText = getByTestId('second-text');
  const finalText = getByTestId('final-text');

  const secondTextInput = within(secondText).getByTestId('input');

  fireEvent.input(secondTextInput, {
      target: { value: 'John Oliver'}
  });
  
  expect(getNodeText(finalText).trim()).toEqual('John Oliver');
});

test('Appended string is correct when both inputs are changed and perform series of operations', () => {
  let { getByTestId, queryByTestId } = renderApp();

  const firstText = getByTestId('first-text');
  const secondText = getByTestId('second-text');
  const finalText = getByTestId('final-text');

  let firstTextInput = within(firstText).getByTestId('input');

  fireEvent.input(firstTextInput, {
      target: { value: 'John Oliver'}
  });

  let secondTextInput = within(secondText).getByTestId('input');

  fireEvent.input(secondTextInput, {
      target: { value: 'is a great writer'}
  });
  
  expect(getNodeText(finalText).trim()).toEqual('John Oliver is a great writer');

  firstTextInput = within(firstText).getByTestId('input');

  fireEvent.input(firstTextInput, {
      target: { value: 'Rock is a music form.'}
  });

  secondTextInput = within(secondText).getByTestId('input');

  fireEvent.input(secondTextInput, {
      target: { value: 'In US rock music form is popular'}
  });
  
  expect(getNodeText(finalText).trim()).toEqual('Rock is a music form. In US rock music form is popular');
});
