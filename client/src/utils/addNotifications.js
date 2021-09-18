// to the beginning of the component
    const notificationCount = useSelector(state => state.newNotifications);
    const dispatch = useDispatch();

    // place where you wanna send the notification
    //change the jobseeker in the URL if you want add notifications to a diffrent user
    // types are: job_applied,job_alert,update,saved_jobs,shortlisted if different leave that empty
    axios.put(`${BACKEND_URL}/jobSeeker/addNotifications/${userId}`,
        {
            title: 'Your application is submitted',
            description: `for ${props.name} at ${props.org}`,
            link: `/jobseeker/appliedJobs`,
            type: 'job_applied',
            createdAt: new Date(),
            isUnRead: true
        })

    dispatch(setNewNotifications(notificationCount + 1));
