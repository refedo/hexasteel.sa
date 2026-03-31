import React from 'react';
import { Container, Typography, Box, TextField, Button, Paper, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import Layout from '../components/layout/Layout';
import PageHeader from '../components/PageHeader';
import Head from 'next/head';
import SEO from '../components/common/SEO';

interface PartnerFormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  businessType: string;
  annualTonnage: string;
  message: string;
}

export default function PartnerPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<PartnerFormData>();

  const onSubmit = async (data: PartnerFormData) => {
    // TODO: Implement form submission logic
    console.log(data);
  };

  return (
    <Layout>
      <SEO
        title="Partner with Us"
        description="Partner with Hexa Steel® — Saudi Arabia's leading steel structure manufacturer. We offer frame agreements with secured tonnage, competitive pricing, and long-term strategic partnerships."
        canonical="/partner"
        keywords="Hexa Steel partner, steel manufacturer partnership, frame agreement, Saudi Arabia steel partner, tonnage agreement"
      />

      <PageHeader 
        title="Become Our Partner"
        description="Join forces with a trusted steel building industry leader. We offer frame agreements with secured tonnage and competitive pricing for qualified partners."
      />

      <div className="bg-gray-50 py-12">
        <Container maxWidth="lg">
          <Paper elevation={3} sx={{ p: 4 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    {...register('companyName', { required: 'Company name is required' })}
                    error={!!errors.companyName}
                    helperText={errors.companyName?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Contact Person"
                    {...register('contactPerson', { required: 'Contact person is required' })}
                    error={!!errors.contactPerson}
                    helperText={errors.contactPerson?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    {...register('phone', { required: 'Phone number is required' })}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Business Type"
                    placeholder="e.g., Contractor, Distributor, Engineering Firm"
                    {...register('businessType', { required: 'Business type is required' })}
                    error={!!errors.businessType}
                    helperText={errors.businessType?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Estimated Annual Tonnage"
                    placeholder="e.g., 1000 MT"
                    {...register('annualTonnage', { required: 'Annual tonnage is required' })}
                    error={!!errors.annualTonnage}
                    helperText={errors.annualTonnage?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Additional Information"
                    placeholder="Tell us more about your business and partnership expectations"
                    {...register('message')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Submit Partnership Application
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>

          <Box mt={6}>
            <Typography variant="h4" gutterBottom>
              Why Partner With Us?
            </Typography>
            <Grid container spacing={4} mt={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Secured Supply
                </Typography>
                <Typography>
                  Benefit from guaranteed tonnage allocation and stable pricing through our frame agreements.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Technical Excellence
                </Typography>
                <Typography>
                  Access our comprehensive technical support and engineering expertise in steel building systems.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Quality Assurance
                </Typography>
                <Typography>
                  Partner with a trusted manufacturer committed to delivering high-quality steel building components.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </Layout>
  );
}
