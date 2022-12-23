import React from 'react'
import { shallow } from 'enzyme'
import Button from './Button'

describe('<Button>', () => {
  let wrapper
  let onClickMock

  beforeEach(() => {
    onClickMock = jest.fn()
    wrapper = shallow(<Button onClick={onClickMock} />)
  })

  afterEach(() => {
    wrapper.unmount()
    onClickMock = undefined
  })

  describe('UI', () => {
    it('has className of "button-component"', () => {
      const button = wrapper.find('button')
      expect(button.hasClass('button-component')).toBeTruthy()
    })

    it('has text of its children', () => {
      wrapper = shallow(<Button onClick={onClickMock}>Click me</Button>)
      const button = wrapper.find('button')
      expect(button.text()).toEqual('Click me')
    })

    it('is not disabled by default', () => {
      const button = wrapper.find('button')
      expect(button.prop('disabled')).toBeFalsy()
    })

    it("is disabled if 'disabled' prop is passed", () => {
      wrapper = shallow(<Button onClick={onClickMock} disabled />)
      const button = wrapper.find('button')
      expect(button.prop('disabled')).toBeTruthy()
    })

    it("is styled with --disabled style if 'disabled' prop is passed", () => {
      wrapper = shallow(<Button onClick={onClickMock} disabled />)
      const button = wrapper.find('button')
      expect(button.hasClass('button-component--disabled')).toBeTruthy()
    })
  })

  describe('Functionality', () => {
    test("by default, it runs 'e.preventDefault()' when clicking", () => {
      const button = wrapper.find('button')
      const mockEvent = { preventDefault: jest.fn() }
      button.props().onClick(mockEvent)
      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1)
    })

    it("runs 'onClick' function when clicked", () => {
      const button = wrapper.find('button')
      const mockEvent = { preventDefault: jest.fn() }
      button.props().onClick(mockEvent)
      expect(onClickMock).toHaveBeenCalledTimes(1)
    })

    it("passes event object to 'onClick' when clicked", () => {
      const button = wrapper.find('button')
      const mockEvent = { preventDefault: jest.fn() }
      button.props().onClick(mockEvent)
      expect(onClickMock).toHaveBeenCalledWith(mockEvent)
    })

    it("doesn't run 'e.preventDefault()' when clicking if 'shouldPreventDefaultOnClick={false}' prop is passed", () => {
      wrapper = shallow(<Button onClick={onClickMock} shouldPreventDefaultOnClick={false} />)
      const button = wrapper.find('button')
      const mockEvent = { preventDefault: jest.fn() }
      button.props().onClick(mockEvent)
      expect(mockEvent.preventDefault).not.toHaveBeenCalled()
    })

    /*
    it("submits its parent form if 'shouldPreventDefaultOnClick={false}' prop is passed", () => {
      // INFO: Could not get this to work the way RTL would propagate functionality
      const submitMock = jest.fn()
      wrapper = shallow(
        <form onSubmit={submitMock}>
          <Button onClick={onClickMock} shouldPreventDefaultOnClick={false} />
        </form>
      )
      const button = wrapper.find(Button).dive()
      const mockEvent = { preventDefault: jest.fn() }
      button.props().onClick(mockEvent) // This does not actually propagate submit form
      wrapper.update()
      const form = wrapper.find('form')
      expect(submitMock).toHaveBeenCalledTimes(1)
    })
    */
  })
})
