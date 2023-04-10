import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import Pagination from '@mui/material/Pagination';
import { toast } from 'react-toastify';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

import {
  useUpdateUserMutation,
  useFetchUserRecordsQuery,
  useDeleteRecordMutation,
  useFetchBalanceQuery,
} from '../redux/services/appApi';
import TabPanel from '../components/TabPanel';
import FormInput from '../components/FormInput';
import RecordItem from '../components/RecordItem';
import { PAGE_SIZE } from '../constants';

const userSchema = object({
  name: string().min(1, 'Name is required').max(100),
  email: string()
    .min(1, 'Email address is required')
    .email('Email Address is invalid'),
});

const Profile = () => {
  const { user } = useSelector((state) => state.userState);
  const [page, setPage] = React.useState(1);
  const [tab, setTab] = React.useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [updateUser, { isLoading, isSuccess, error, isError }] =
    useUpdateUserMutation();
  const {
    data: records,
    recordsIsLoading,
    recordsError,
  } = useFetchUserRecordsQuery({ params: { limit: PAGE_SIZE, page } });
  const [
    deleteRecord,
    { deleteRecordIsLoading, deleteRecordIsSuccess, deleteRecordError },
  ] = useDeleteRecordMutation();
  const { data: balance, isLoading: balanceIsLoading } = useFetchBalanceQuery();
  const methods = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });
  const { handleSubmit } = methods;

  useEffect(() => {
    if (isSuccess) {
      toast.success('Profile updated successfully');
      setIsEdit(false);
    }

    if (isError) {
      console.error(error);
      toast.error(error.data, {
        position: 'top-right',
      });
    }
  }, [isLoading]);

  const handleChangeTab = (e, value) => {
    setTab(value);
  };

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  const handleDeleteRecord = (e) => {
    deleteRecord(e.currentTarget.dataset.id);
  };

  const onSubmitHandler = (values) => {
    if (!isEdit) {
      setIsEdit(true);
    } else updateUser({ id: user.id, body: values });
  };

  return (
    <Stack sx={{ mx: 'auto', pt: 4 }} maxWidth="sm" alignItems="center">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tab}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
          >
            <Tab label="My Account" />
            <Tab label="My Operations" />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          <Avatar
            sx={{ width: 100, height: 100, fontSize: 40, mx: 'auto', mb: 2 }}
          >
            {user?.name[0]}
          </Avatar>
          <Typography align="center" variant="h5">
            Balance: {balance?.balance?.credits}
          </Typography>
          <FormProvider {...methods}>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmitHandler)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormInput disabled={!isEdit} name="name" label="Name" />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    disabled={!isEdit}
                    name="email"
                    label="Email Address"
                    type="email"
                  />
                </Grid>
              </Grid>
              <LoadingButton
                variant="contained"
                sx={{ mt: 1 }}
                fullWidth
                disableElevation
                type="submit"
                loading={isLoading}
              >
                {isEdit ? 'Update Profile' : 'Edit Profile'}
              </LoadingButton>
              {isEdit && (
                <LoadingButton
                  variant="contained"
                  sx={{ mt: 1 }}
                  fullWidth
                  disableElevation
                  type="button"
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </LoadingButton>
              )}
            </Box>
          </FormProvider>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          {recordsIsLoading ? (
            <Typography>Loading...</Typography>
          ) : (
            <React.Fragment>
              <Stack alignItems="center">
                <Pagination
                  sx={{ alignSelf: 'center' }}
                  count={Math.ceil(records?.total / PAGE_SIZE) || 0}
                  showFirstButton
                  showLastButton
                  page={page}
                  onChange={handleChangePage}
                />
              </Stack>
              <List>
                {records?.results?.map((record) => (
                  <RecordItem
                    {...record}
                    key={record.id}
                    onDelete={handleDeleteRecord}
                  />
                ))}
              </List>
            </React.Fragment>
          )}
        </TabPanel>
      </Box>
    </Stack>
  );
};

export default Profile;
