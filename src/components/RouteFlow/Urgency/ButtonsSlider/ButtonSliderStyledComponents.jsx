import styled from 'styled-components';

export const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  margin-bottom: 1rem;
`;

export const SlideButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.selected ? 'white' : 'rgb(116, 116, 116)')};
  background-color: ${(props) =>
    props.selected ? 'rgba(116, 116, 116, 0.3)' : 'none'};
  border-radius: 1rem;
  height: 3.5rem;
  padding: 1rem;
`;

export const EmptyCategories = styled.div`
  height: 3.5rem;
`;
