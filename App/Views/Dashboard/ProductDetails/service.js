// Imports
import {useEffect, useState} from 'react';
import addToBasketService from 'Services/AddToBasket';
import {useDispatch} from 'react-redux';
import {Feedback} from '@Atoms';
import getBasket from '../../../Store/Actions/Basket';
import api from 'Services/api';
import removeFromBasketService from 'Services/RemoveFromBasket';

// Main functional component
const ProductDetails = (props) => {
  const _data = props.route.params?.data || false;
  const fetchURL = props.route.params?.fetchURL || false;
  const removeURL = props.route.params?.removeURL || false;
  const edit = props.route.params?.edit || false;
  const modifiers = props.route.params?.modifiers || false;

  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState(_data);
  const [isLoading, setIsLoading] = useState(false);
  const [sides, setSides] = useState([]);
  const [groupSides, setGroupSides] = useState([]);
  const [sideUpdate, setSideUpdate] = useState(false);
  const [includesAllGroups, setIncludesAllGroups] = useState([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setData(data);
    } else {
      fetchProduct();
    }
  }, []);

  useEffect(() => {
    if (edit) {
      setIsButtonEnabled(true);
    } else if (checkSides()) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [sideUpdate]);

  useEffect(() => {
    if (modifiers) {
      data?.modifier_groups?.map((group) => {
        group?.modifiers?.map((modifier) => {
          modifiers?.map((m) => {
            if (m.name === modifier.name) {
              sides.push(modifier.id);
              groupSides.push({groupId: group.id, id: modifier.id});
            }
          });
        });
      });
    }
  }, [data]);

  function fetchProduct() {
    setIsLoading(true);
    api
      .get(fetchURL)
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
          setIsLoading(false);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }

  function checkSides() {
    if (data?.modifier_groups?.length > 0) {
      setIncludesAllGroups([]);
      const includes = data?.modifier_groups?.map((group) => {
        const isRequiredGroup = group.required;
        if (isRequiredGroup) {
          let exists =
            group?.modifiers?.filter((modifier) => sides.includes(modifier.id))
              .length > 0;
          includesAllGroups.push(exists);
        } else {
          includesAllGroups.push(true);
        }
        return includesAllGroups;
      });

      let length = includes[0]?.filter((i) => i === true).length;

      if (length === data?.modifier_groups?.length) return true;
      else return false;
    } else return true;
  }

  function removeAndAddToBasket() {
    if (checkSides()) {
      console.debug('Remove Item and Add update.');
      setIsLoading(true);
      removeFromBasketService(removeURL)
        .then(() => {
          console.debug('Item Removed.');
          addToBasket();
        })
        .catch((err) => {
          console.log('Failed to remove product', err.response);
          setIsLoading(false);
        });
    } else {
      // Feedback.simple('Please select at least one of every side group.', 'OK');
      setIsLoading(false);
    }
  }

  function addToBasket() {
    if (edit || checkSides()) {
      console.debug(`Add ${data.title} to basket.`);
      setIsLoading(true);
      addToBasketService({
        url: data.url,
        quantity: quantity,
        modifier_options: sides,
      })
        .then(() => {
          const {navigate} = props.navigation;
          dispatch(getBasket()).then(() => {
            setTimeout(() => {
              setQuantity(1);
              setIsLoading(false);
            }, 500);
            if (edit) {
              console.debug('Product updated Successfully.');
              console.debug('Navigate to Basket.');
              navigate('Cart');
            } else {
              console.debug('Navigate to Vendor Detail.');
              navigate('VendorDetails');
            }
          });
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err.response);
          Feedback.error(
            'Oops! Something went wrong while adding item to Basket',
            'OK',
          );
        });
    } else {
      Feedback.simple(
        '"REQUIRED" side items are missing, please select and continue.',
        'OK',
      );
    }
  }

  const selectSide = (type, group, modifier, isChecked) => {
    const index = sides?.indexOf(modifier.id);

    if (type === 'RADIO') {
      let grp = groupSides;
      let obj = sides;
      if (sides.length > 0) {
        if (isChecked) {
          obj.splice(index, 1);
          grp.splice(index, 1);
        } else {
          const exists =
            groupSides.filter((g) => g.groupId === group.id).length > 0;
          if (exists) {
            grp = grp.filter((g) => g.groupId !== group.id);
            obj = grp.map((g) => g.id);
            obj.push(modifier.id);
            grp.push({groupId: group.id, id: modifier.id});
          } else {
            obj.push(modifier.id);
            grp.push({groupId: group.id, id: modifier.id});
          }
        }
      } else {
        grp.push({groupId: group.id, id: modifier.id});
        obj.push(modifier.id);
      }
      setSides(obj);
      setGroupSides(grp);
      setSideUpdate(!sideUpdate);
    } else {
      let obj = sides;
      let grp = groupSides;
      let limit = group.limit;

      if (isChecked) {
        obj.splice(index, 1);
        grp.splice(index, 1);
      } else {
        let limitReached =
          groupSides.filter((g) => g.groupId === group.id).length >= limit;
        if (!limitReached || limit === 0 || limit === null) {
          obj.push(modifier.id);
          grp.push({groupId: group.id, id: modifier.id});
        }
      }
      setSides(obj);
      setGroupSides(grp);
      setSideUpdate(!sideUpdate);
    }
  };

  return {
    isLoading,
    data,
    sides,
    quantity,
    edit,
    removeAndAddToBasket,
    setQuantity,
    selectSide,
    addToBasket,
    isButtonEnabled,
    groupSides,
  };
};

// Export
export default ProductDetails;
