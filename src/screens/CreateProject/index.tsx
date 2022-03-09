import React from 'react';
import PageWrapper from '../../common/components/PageWrapper';
import { BasePageProps } from '../../common/models';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { AutoComplete } from 'primereact/autocomplete';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';

const CreateProjectPage: React.FC<BasePageProps> = (props) => {
    const { t } = props;
    const formik = useFormik({
        initialValues: {
            number: 0,
            name: '',
            group: '',
            customer: '',
            members: [],
            status: 0,
            startDate: new Date(),
            endDate: new Date(),
        },
        onSubmit: () => {},
    });

    return (
        <PageWrapper>
            <Card>
                <div className="flex justify-center">
                    <div className="w-full md:w-3/5 xl:w-1/2">
                        <div className="font-bold md:text-lg">
                            {t('newProject')}
                        </div>
                        <Divider />
                        <form
                            className="space-y-4"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="number">
                                    {t('projectNumber')}
                                </label>
                                <InputNumber
                                    inputId="number"
                                    name="number"
                                    className="w-max"
                                    value={formik.values.number}
                                    onValueChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    mode="decimal"
                                    min={0}
                                    max={9999}
                                    useGrouping={false}
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="name">{t('projectName')}</label>
                                <InputText
                                    id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="customer">
                                    {t('customer')}
                                </label>
                                <InputText
                                    id="customer"
                                    name="customer"
                                    value={formik.values.customer}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="group">{t('group')}</label>
                                <Dropdown
                                    id="group"
                                    name="group"
                                    options={[]}
                                    value={formik.values.group}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    optionLabel="name"
                                    optionValue="name"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="members">{t('members')}</label>
                                <AutoComplete
                                    id="members"
                                    name="members"
                                    value={formik.values.members}
                                    suggestions={[]}
                                    completeMethod={() => {}}
                                    field="name"
                                    multiple
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="status">{t('status')}</label>
                                <Dropdown
                                    id="status"
                                    name="status"
                                    options={[]}
                                    value={formik.values.status}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    optionLabel="name"
                                    optionValue="name"
                                />
                            </div>
                            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:justify-between pb-4">
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="startDate">
                                        {t('startDate')}
                                    </label>
                                    <Calendar
                                        id="startDate"
                                        name="startDate"
                                        value={formik.values.startDate}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        showIcon
                                    />
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="endDate">
                                        {t('endDate')}
                                    </label>
                                    <Calendar
                                        id="endDate"
                                        name="endDate"
                                        value={formik.values.endDate}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        showIcon
                                    />
                                </div>
                            </div>
                            <Divider />
                            <div className="flex justify-end md:space-x-10 space-x-4 mb-4 pt-4">
                                <Button
                                    type="submit"
                                    icon="pi pi-times"
                                    className="p-button-danger"
                                    label={t('cancel')}
                                />
                                <Button
                                    type="submit"
                                    icon="pi pi-check"
                                    label={t('create')}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </Card>
        </PageWrapper>
    );
};

export default CreateProjectPage;
