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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../utils/redux/store';
import { DispatchType } from '../../common/constants';
import useFetchGroups from '../../hooks/useGroups';
import LoadingMask from '../../common/components/LoadingMask';
import useFetchStatuses from '../../hooks/useStatuses';
import useFetchMembers from '../../hooks/useMembers';

const CreateProjectPage: React.FC<BasePageProps> = (props) => {
    const { t } = props;
    const dispatch = useDispatch();
    const { data: groups, isLoading: isGroupsLoading } = useFetchGroups();
    const { data: statuses, isLoading: isStatusesLoading } = useFetchStatuses();
    const { data: members, isLoading: isMembersLoading } = useFetchMembers();
    const filteredMembers = useSelector(
        (state: RootState) => state.create_proj.filteredMembers
    );

    const searchMember = (event: { query: string }) => {
        setTimeout(() => {
            let _filteredMembers;
            if (!event.query.trim().length) {
                _filteredMembers = [...(members ?? [])];
            } else {
                _filteredMembers = members?.filter((member) => {
                    return (
                        member.name
                            .toLowerCase()
                            .startsWith(event.query.toLowerCase()) ||
                        member.visa
                            .toLowerCase()
                            .startsWith(event.query.toLowerCase())
                    );
                });
            }

            dispatch({
                type: DispatchType.CREATE_PROJ.FILTERED_MEMS,
                data: _filteredMembers,
            });
        }, 250);
    };

    const formik = useFormik({
        initialValues: {
            number: null,
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

    if (isGroupsLoading || isStatusesLoading || isMembersLoading) {
        return <LoadingMask />;
    }

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
                                    options={groups}
                                    value={formik.values.group}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    optionLabel="name"
                                    optionValue="id"
                                />
                            </div>
                            <div className="flex flex-col space-y-2 p-fluid">
                                <label htmlFor="members">{t('members')}</label>
                                <AutoComplete
                                    id="members"
                                    name="members"
                                    value={formik.values.members}
                                    suggestions={filteredMembers}
                                    completeMethod={searchMember}
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
                                    options={statuses}
                                    value={formik.values.status}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    optionLabel="name"
                                    optionValue="id"
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
