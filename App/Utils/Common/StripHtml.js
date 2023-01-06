const StripHtml = (_) => {
  if (_) return _.replace(/&amp;/g, '').replace(/<\/?[^>]+(>|$)/g, '');
  else return '';
};

export default StripHtml;
