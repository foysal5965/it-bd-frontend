import { useState, useEffect } from 'react';
import CourseCategory from './CourseCategory';
import Loading from '@/components/shared/loading/loading';
import { useGetCourseCategoryQuery } from '@/redux/api/courseCategory.api';
interface DataItem {
    image: string,
    categoryName: string
}

export interface Props {
    data: DataItem[];
}
export const Category = () => {

    const [data, setData] = useState<Props[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://itbd-backend.vercel.app/api/v1/category')
            .then((response) => response.json())
            .then((data: Props[]) => {
                setData(data);
                setLoading(false);
            });
    }, []);
    if (loading) return <Loading/>;

    return <CourseCategory data={data} />;
};
