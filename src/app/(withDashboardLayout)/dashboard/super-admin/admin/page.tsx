// pages/admins.js
'use client'
import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import AdminTable from '@/components/table/AdminTable';
import { useAdminQuery, useDeleteadminMutation } from '@/redux/api/adminApi';
import Loading from '@/components/shared/loading/loading';
import { toast } from 'sonner';

const AdminPage = () => {
  // Sample data for admins
  const [admin, setAdmin] = useState([]);
  const query = {}

  const { data: admins, isLoading } = useAdminQuery({ ...query })
  const [deleteAdmin]= useDeleteadminMutation()

  const handleDelete = async(adminId: any) => {
    const res = await deleteAdmin(adminId)
    console.log(res)
    if(res){
      toast.success('Admin data deleted successfuly!!')
    }
  };
  if (isLoading) {
    return <Loading />
  }
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admins List
      </Typography>
      <AdminTable admins={admins} handleDelete={handleDelete} />
    </Container>
  );
};

export default AdminPage;
