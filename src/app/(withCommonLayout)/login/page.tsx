'use client'
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, TextField, Button, Container, Typography, InputAdornment, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { modifyPayload } from '@/utils/modifyPayload';
import { registerStudent } from '@/services/actions/registerStudent';
import { toast } from 'sonner';
import ITForm from '@/components/Forms/ITForm';
import ITInput from '@/components/Forms/ITInput';
// import { userLogin } from '@/services/actions/userLogin';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { storeUserInfo } from '@/services/authService';
import { useState } from 'react';
import { useUserLoginMutation } from '@/redux/api/authApi';
import setAccessToken from '@/services/actions/setAccessToken';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Cookies from 'js-cookie';
import { useAuth } from '@/lib/Providers/AuthProvider';
import { userLogin } from '@/services/actions/userLogin';

type CourseCategoryErrorResponse = {
    data: string;
    statusCode: number;
    message: string;
};
interface LoginData {
    email: string
    password: string;
}
// 1. Create the Zod validation schema
const validationSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
export const defaultValues = {
    password: "",
    patient: {
        name: "",
        email: "",
        contactNumber: "",
        address: "",
    },
};
// 2. Your component
const LoginPage = () => {
    const { login } = useAuth();
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
        resolver: zodResolver(validationSchema),
    });
    const [error, setError] = useState('')
    const [showNewPassword, setShowNewPassword] = useState(false);
    // const [userLogin, isLoading] = useUserLoginMutation()
    const handleRegister = async (values: FieldValues) => {
        const res = await userLogin(values);
        try {
            console.log(res)
            if (res?.data?.accessToken) {
                // console.log(res)
                toast.success(res.message);
                storeUserInfo({ accessToken: res?.data?.accessToken });
                login(res.data.accessToken);
                router.push('/')
            }

            setError(res.message || 'An unknown error occurred.');

        } catch (err: any) {

        }
    };

    return (
        <Container
            component={motion.div}
            maxWidth="xs"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}

            sx={{
                alignItems: 'center',
                justifyContent: 'center',
                mt: 2,
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: 3, // Add shadow for depth,
                marginTop: 10
            }}
        >

            <Typography
                variant="h4"
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center', color: '#333' }}
            >
                Login
            </Typography>

            <Box
                component={motion.form}
                onSubmit={handleSubmit(handleRegister)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                sx={{
                    width: '100%',
                    mt: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}
            >


                {/* Email Input */}
                <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        size='small'
                        fullWidth
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                </motion.div>

                {/* Password Input */}
                <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
                    <TextField
                        label="Password"
                        type={showNewPassword ? 'text' : 'password'}
                        variant="outlined"
                        size='small'
                        fullWidth
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        edge="end"
                                    >
                                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </motion.div>



                <Link href={'/forgot-password'}>
                    <Typography
                        mb={1}
                        textAlign='start'
                        component='p'
                        fontWeight={300}
                        sx={{
                            textDecoration: 'underline',
                            color: '#E57373'
                        }}
                    >
                        Forgot Password?
                    </Typography>
                </Link>
                <Typography sx={{
                    textAlign: 'center',
                    color: 'red',
                    fontWeight: '400'
                }}>{error ? error : ''}</Typography>
                {/* Register Button */}
                <Button
                    component={motion.button}
                    type="submit"
                    variant="contained"
                    fullWidth
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                        mt: 2,
                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                        padding: '10px 0',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '5px',
                    }}
                >
                    Login
                </Button>
            </Box>
            {/* Already have an account? */}
            <Typography component='p' align='center' sx={{ paddingTop: 1, paddingBottom: 1 }} fontWeight={300}>
                Don&apos;t have an account?{' '}
                <span className='text-red-300'><Link href='/register'>Create an account</Link></span>
            </Typography>

        </Container>

    );
};

export default LoginPage;
