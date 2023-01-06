const closeToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 1;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export default closeToBottom;
