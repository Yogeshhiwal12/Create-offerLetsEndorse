import backgroundImage from '../assets/offer.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  offerCode: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: '60px',
    padding: '5px',
    fontSize: '3rem',
  },
  discountPercentage: {
    fontSize: '4rem',
  },
}));

const OfferList = () => {
  const [offers, setOffers] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('https://letsendoresofferbackend.onrender.com/offers');
        setOffers(response.data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div>
      {offers.map((offer) => (
        <Card
          key={offer._id}
          style={{
            background: `url(${backgroundImage}) center center / cover no-repeat`,
            position: 'relative',
            marginBottom: '20px',
            width: '100%',
            height: '650px',
          }}
        >
          <CardContent
            style={{
              position: 'absolute',
              bottom: '0px',
              right: '150px', // Add some space from the right end
            }}
          >
            <Typography variant="h2">{offer.offerTitle}</Typography>
            <Typography variant="h4">{offer.offerDescription}</Typography>
            <Typography variant="body2" className={classes.offerCode}>
              {offer.offerCode}
            </Typography>
            <Typography variant="h4">{offer.offerType}</Typography>
            {offer.discountPercentage && (
              <Typography variant="body2" className={classes.discountPercentage}>
                 {offer.discountPercentage}%
              </Typography>
            )}
            <Typography variant="h4">On: {offer.applicableOn}</Typography>
            <Typography variant="h4">
              Minimum Order Value: ₹{offer.minValue}
            </Typography>
            {offer.maxValue && (
              <Typography variant="h3">
                Maximum Discount: ₹{offer.maxValue}
              </Typography>
            )}
            <Typography variant="h4">
              Start Date: {new Date(offer.startDate).toLocaleDateString()}
            </Typography>
            <Typography variant="h4">
              Valid till {new Date(offer.expiryDate).toLocaleDateString()}
            </Typography>
            {offer.limitedCustomers && (
              <Typography variant="h4">
                Total Customers: {offer.totalCustomers}
              </Typography>
            )}
            {offer.limitedUsage && (
              <Typography variant="h5">
                Usage Per Customer: {offer.usagePerCustomer}
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OfferList;
