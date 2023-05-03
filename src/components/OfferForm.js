import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Grid,
  FormGroup,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { motion } from 'framer-motion';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    backgroundColor: 'white',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  formTitle: {
    marginBottom: theme.spacing(2),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
  },
  submitButton: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(33, 150, 243, 0.8)',
    },
  },
}));

const OfferForm = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [formData, setFormData] = useState({
    offerCode: '',
    offerTitle: '',
    offerDescription: '',
    offerType: '',
    discountPercentage: null,
    applicableOn: '',
    minValue: null,
    maxValue: null,
    startDate: new Date(),
    expiryDate: null,
    limitedCustomers: false,
    totalCustomers: null,
    limitedUsage: false,
    usagePerCustomer: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://letsendoresofferbackend.onrender.com/offers/create', formData);
      alert('Offer created successfully');
      setFormData({
        offerCode: '',
        offerTitle: '',
        offerDescription: '',
        offerType: '',
        discountPercentage: null,
        applicableOn: '',
        minValue: null,
        maxValue: null,
        startDate: new Date(),
        expiryDate: null,
        limitedCustomers: false,
        totalCustomers: null,
        limitedUsage: false,
        usagePerCustomer: null,
      });
      navigate('/offers');
    } catch (error) {
      console.error('Error creating offer:', error);
      alert('Error creating offer. Please try again.');
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h4"
            align="center"
            className={classes.formTitle}
            gutterBottom
          >
            Create Offer
          </Typography>
          <form onSubmit={handleSubmit} className={classes.formContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="offerCode"
                  name="offerCode"
                  label="Offer Code (Max 8 characters)"
                  maxLength="8"
                  value={formData.offerCode}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="offerTitle"
                  name="offerTitle"
                  label="Offer Title* (Max 60 characters)"
                  maxLength="60"
                  value={formData.offerTitle}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="offerDescription"
                  name="offerDescription"
                  label="Offer Description (Max 140 characters)"
                  maxLength="140"
                  value={formData.offerDescription}
                  onChange={handleChange}
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="offerType">Offer Type*</InputLabel>
                  <Select
                    labelId="offerType"
                    id="offerType"
                    name="offerType"
                    value={formData.offerType}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="">
                      <em>Select an offer type</em>
                    </MenuItem>
                    <MenuItem value="Percentage discount">Percentage discount</MenuItem>
                    <MenuItem value="Flat discount">Flat discount</MenuItem>
                    <MenuItem value="Free Gift">Free Gift</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {formData.offerType === 'Percentage discount' && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="discountPercentage"
                    name="discountPercentage"
                    label="Discount %*"
                    type="number"
                    value={formData.discountPercentage}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="applicableOn">Applicable on*</InputLabel>
                  <Select
                    labelId="applicableOn"
                    id="applicableOn"
                    name="applicableOn"
                    value={formData.applicableOn}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="">
                      <em>Select applicable on</em>
                    </MenuItem>
                    <MenuItem value="All orders">All orders</MenuItem>
                    <MenuItem value="Orders above certain amount">Orders above certain amount</MenuItem>
                    <MenuItem value="Select services">Select services</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="minValue"
                  name="minValue"
                  label="Minimum order value* (₹)"
                  type="number"
                  value={formData.minValue}
                  onChange={handleChange}
                  required
                />
              </Grid>
              {formData.offerType === 'Percentage discount' && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="maxValue"
                    name="maxValue"
                    label="Maximum discount* (₹)"
                    type="number"
                    value={formData.maxValue}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              )}
              <Grid item xs={6}>
                <DatePicker
                  label="Start Date*"
                  value={formData.startDate}
                  onChange={(date) => handleDateChange(date, 'startDate')}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="Expiration Date*"
                  value={formData.expiryDate}
                  onChange={(date) => handleDateChange(date, 'expiryDate')}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Grid>
              <Grid item xs={12}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.limitedCustomers}
                        onChange={handleSwitchChange}
                        name="limitedCustomers"
                      />
                    }
                    label="Limited customers"
                  />
                  {formData.limitedCustomers && (
                    <TextField
                      id="totalCustomers"
                      name="totalCustomers"
                      label="Total customers"
                      type="number"
                      value={formData.totalCustomers}
                      onChange={handleChange}
                      required
                    />
                  )}
                </FormGroup>
              </Grid>
              <Grid item xs={12}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                        <Switch
                        checked={formData.limitedUsage}
                        onChange={handleSwitchChange}
                        name="limitedUsage"
                      />
                    }
                    label="Limited usage per customer"
                  />
                  {formData.limitedUsage && (
                    <TextField
                      id="usagePerCustomer"
                      name="usagePerCustomer"
                      label="Usage per customer"
                      type="number"
                      value={formData.usagePerCustomer}
                      onChange={handleChange}
                      required
                    />
                  )}
                </FormGroup>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  className={classes.submitButton}
                  type="submit"
                >
                  Create Offer
                </Button>
              </Grid>
            </Grid>
            </form>
        </motion.div>
      </Container>
    </MuiPickersUtilsProvider>
  );
};

export default OfferForm;

