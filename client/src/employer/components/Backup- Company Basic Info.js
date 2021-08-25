const old = () => {
    return (
      <>
        <Grid item container direction="row" spacing={3}>
          {/* HEAD PART OF THE COMPANY INFO CARD */}

          <Grid
            xs={12}
            item
            container
            direction="column"
            spacing={1}
            className={classes.header}
          >
            {/* LOGO */}

            <Grid item xs={3} className={classes.logoItem}>
              <Avatar className={classes.logo} src={loadLogo()} variant="square" />
            </Grid>

            {/* OTHER INFO NEXT TO LOGO */}

            <Grid
              item
              container
              xs={9}
              direction="row"
              spacing={1}
              className={classes.info}
            >
              {/* PANEL 01 FOR COMPANY NAME, MEMBERSHIP TYPE AND EDIT BUTTON */}

              <Grid item xs={9} style={{ marginBottom: -30 }}>
                <Typography variant="h5" className={classes.companyName}>
                  {name}
                </Typography>

                <div className={classes.headerRight}>
                  <Chip
                    icon={<LoyaltyIcon />}
                    label={subscription}
                    className={classes.membershipType}
                  />
                  {props.userRole == "employer" || haveAccess == true ? (
                    <IconButton
                      variant="outlined"
                      aria-label="edit"
                      className={classes.editButton}
                      onClick={handleClickOpen}
                    >
                      <EditIcon />
                    </IconButton>
                  ) : (
                    <div className={classes.setMargin}>
                    </div>
                  )}

                  {/* <form onSubmit={onSubmit}> */}
                  <form>
                    {/* Dialog box for the edit details */}

                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="edit-details-form"
                      fullWidth
                      className={classes.dialogBox}
                    >
                      <DialogTitle id="edit-details-form">
                        Company Profile
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>*Required Fields</DialogContentText>

                        {/* input fields */}

                        <div>
                          <Grid
                            container
                            xs={12}
                            direction="column"
                            spacing={2}
                          >
                            <Grid item sm={12}>
                              <TextField
                                required
                                fullWidth
                                id="name"
                                label="Company Name"
                                variant="outlined"
                                defaultValue={name}
                                InputProps={{
                                  classes: {
                                    input: classes.textField,
                                  },
                                }}
                                onChange={onChangeName}
                              />
                            </Grid>

                            <Grid item sm={12}>
                              <Autocomplete
                                multiple
                                required={true}
                                id="fixed-tags-demo"
                                value={location}
                                onChange={(event, newValue) => {
                                  setLocation([
                                    ...fixedOptions,
                                    ...newValue.filter(
                                      (option) =>
                                        fixedOptions.indexOf(option) === -1
                                    ),
                                  ]);
                                }}
                                options={cities}
                                getOptionLabel={(option) => option.city}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Location"
                                    variant="outlined"
                                    required
                                  />
                                )}
                              />
                            </Grid>

                            <Grid
                              item
                              container
                              direction="row"
                              sm={12}
                              spacing={1}
                            >
                              <Grid item sm={6}>
                                <InputLabel htmlFor="linkedIn">
                                  LinkedIn
                                </InputLabel>
                                <Input
                                  id="linkedIn"
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <LinkedInIcon />
                                    </InputAdornment>
                                  }
                                  defaultValue={linkedIn}
                                  InputProps={{
                                    classes: {
                                      input: classes.textField,
                                    },
                                  }}
                                  onChange={onChangeLinkedIn}
                                />
                              </Grid>

                              <Grid item sm={6}>
                                <InputLabel htmlFor="website">
                                  Website
                                </InputLabel>
                                <Input
                                  id="website"
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <LanguageIcon />
                                    </InputAdornment>
                                  }
                                  defaultValue={website}
                                  InputProps={{
                                    classes: {
                                      input: classes.textField,
                                    },
                                  }}
                                  onChange={onChangeWebsite}
                                />
                              </Grid>
                            </Grid>

                            <Grid
                              item
                              container
                              direction="row"
                              sm={12}
                              spacing={1}
                            >
                              <Grid item sm={6}>
                                <InputLabel htmlFor="facebook">
                                  Facebook
                                </InputLabel>
                                <Input
                                  id="facebook"
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <FacebookIcon />
                                    </InputAdornment>
                                  }
                                  defaultValue={facebook}
                                  InputProps={{
                                    classes: {
                                      input: classes.textField,
                                    },
                                  }}
                                  onChange={onChangeFacebook}
                                />
                              </Grid>

                              <Grid item sm={6}>
                                <InputLabel htmlFor="twitter">
                                  Twitter
                                </InputLabel>
                                <Input
                                  id="twitter"
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <TwitterIcon />
                                    </InputAdornment>
                                  }
                                  defaultValue={twitter}
                                  InputProps={{
                                    classes: {
                                      input: classes.textField,
                                    },
                                  }}
                                  onChange={onChangeTwitter}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </div>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleClose}
                          color="primary"
                          className={classes.dialogbuttons}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          onClick={onSubmit}
                          color="primary"
                          className={classes.dialogbuttons}
                        >
                          Save
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </form>
                </div>
              </Grid>

              {/* Alerts */}
              <Snackbar
                open={openAlertValidationError}
                autoHideDuration={6000}
                onClose={handleCloseAlertValidationError}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              >
                <Alert
                  onClose={handleCloseAlertValidationError}
                  severity="error"
                >
                  Required fields cannot be empty!
                </Alert>
              </Snackbar>

              <Snackbar
                open={openAlertServerError}
                autoHideDuration={6000}
                onClose={handleCloseAlertServerError}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              >
                <Alert onClose={handleCloseAlertServerError} severity="error">
                  Server error! Changes couldn't be saved!
                </Alert>
              </Snackbar>

              <Snackbar
                open={openAlertSuccess}
                autoHideDuration={6000}
                onClose={handleCloseAlertSuccess}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              >
                <Alert onClose={handleCloseAlertSuccess} severity="success">
                  Changes saved successfully!
                </Alert>
              </Snackbar>

              {/* PANEL 02 FOR LOCATION AND JOB TYPE */}

              <Grid item xs={9}>
                <div className={classes.locationTags}>
                  {Array.from(location).map((item, i) => (
                    <Chip
                      icon={<LocationOnRoundedIcon />}
                      label={item.city}
                      className={classes.tag}
                    />
                  ))}
                </div>
              </Grid>

              {/* PANEL 03 FOR STAR RATING DISPLAY */}

              {reviews.length > 0 ? (
                <Grid item xs={9}>
                  <div className={classes.rating}>
                    <Rating
                      name="read-only"
                      value={getAverageRating()}
                      precision={0.5}
                      readOnly
                    />
                  </div>

                  <div className={classes.ratingText}>
                    <Typography>
                      <Box fontSize={14} fontWeight="fontWeightMedium" m={1}>
                        {getAverageRating()} stars ({reviews.length})
                      </Box>
                    </Typography>
                  </div>
                </Grid>
              ) : (
                <Grid item xs={9}>
                  <div className={classes.rating}>
                    <Rating
                      name="read-only"
                      value={0}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <div className={classes.ratingText}>
                    <Typography>
                      <Box fontSize={14} fontWeight="fontWeightMedium" m={1}>
                        (no reviews)
                      </Box>
                    </Typography>
                  </div>
                </Grid>
              )}

              {/* PANEL 04 FOR SOCIAL MEDIA LINKS */}

              <Grid
                container
                item
                xs={9}
                className={classes.smIcons}
                spacing={5}
              >
                <Grid item xs={1}>
                  <Link to={{ pathname: website }} target="_blank">
                    <IconButton variant="outlined" aria-label="website">
                      <LanguageIcon />
                    </IconButton>
                  </Link>
                </Grid>

                <Grid item xs={1}>
                  <Link to={{ pathname: linkedIn }} target="_blank">
                    <IconButton variant="outlined" aria-label="website">
                      <LinkedInIcon />
                    </IconButton>
                  </Link>
                </Grid>
                <Grid item xs={1}>
                  <Link to={{ pathname: twitter }} target="_blank">
                    <IconButton variant="outlined" aria-label="website">
                      <TwitterIcon />
                    </IconButton>
                  </Link>
                </Grid>
                <Grid item xs={1}>
                  <Link to={{ pathname: facebook }} target="_blank">
                    <IconButton variant="outlined" aria-label="website">
                      <FacebookIcon />
                    </IconButton>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Edit Company Logo */}

          <Grid item container alignItems="center" direction="row" xs={12}>
            <Grid item sm={3} className={classes.editPhoto}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
              />

              <label htmlFor="raised-button-file">
                {props.userRole === "employer" && (
                  <IconButton
                    variant="outlined"
                    aria-label="edit"
                    className={classes.editPhotoButton}
                  // onClick={handleClickOpen}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </label>
            </Grid>
          </Grid>
        </Grid>

        <br />

        
        
        
        
        <div className={classes.root}>
      <FloatCard>
        <Grid item container direction="row" spacing={3}>
          {/* HEAD PART OF THE COMPANY INFO CARD */}

          <Grid
            xs={12}
            item
            container
            direction="column"
            spacing={1}
            className={classes.header}
          >
            {/* OTHER INFO NEXT TO LOGO */}

            <Grid
              item
              container
              xs={9}
              direction="row"
              spacing={1}
              className={classes.info}
            >
              {/* EDIT BUTTON */}

              <Grid item xs={9}>
                <div className={classes.headerRight}>
                  {props.userRole === "employer" ||
                    (haveAccess && (
                      <IconButton
                        variant="outlined"
                        aria-label="edit"
                        className={classes.editButton}
                        onClick={handleClickOpen}
                      >
                        <EditIcon />
                      </IconButton>
                    ))}

                  {/* <form onSubmit={onSubmit}> */}
                  <form>
                    {/* Dialog box for the edit details */}

                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="edit-details-form"
                      fullWidth
                      className={classes.dialogBox}
                    >
                      <DialogTitle id="edit-details-form">
                        Company Description
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>*Required Fields</DialogContentText>

                        {/* input fields */}

                        <div>
                          <Grid item sm={12}>
                            <TextField
                              multiline
                              fullWidth
                              id="description"
                              defaultValue={description}
                              label="Description"
                              rows={5}
                              variant="outlined"
                              InputProps={{
                                classes: {
                                  input: classes.textField,
                                },
                              }}
                              onChange={onChangeDescription}
                            />
                          </Grid>
                        </div>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleClose}
                          color="primary"
                          className={classes.dialogbuttons}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          onClick={onSubmit}
                          color="primary"
                          className={classes.dialogbuttons}
                        >
                          Save
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </form>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <br />

        <Snackbar
          open={openAlertValidationError}
          autoHideDuration={6000}
          onClose={handleCloseAlertValidationError}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert onClose={handleCloseAlertValidationError} severity="error">
            Company Description cannot be empty!
          </Alert>
        </Snackbar>

        <Snackbar
          open={openAlertServerError}
          autoHideDuration={6000}
          onClose={handleCloseAlertServerError}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert onClose={handleCloseAlertServerError} severity="error">
            Server error! Changes couldn't be saved
          </Alert>
        </Snackbar>

        <Snackbar
          open={openAlertSuccess}
          autoHideDuration={6000}
          onClose={handleCloseAlertSuccess}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert onClose={handleCloseAlertSuccess} severity="success">
            Changes saved successfully!
          </Alert>
        </Snackbar>

        <Grid container direction="row" spacing={3}>
          {/* BODY PART OF THE COMPANY INFO CARD */}

          {technologyStack.length > 0 ? (
            <Grid item xs={12}>
              <div className={classes.infoTagsContainer}>
                {Object.keys(technologyStack).map((item, i) => (
                  <Chip
                    icon={<LocalOfferRoundedIcon className={classes.tagIcon} />}
                    label={technologyStack[i].type}
                    className={classes.label}
                  />
                ))}
              </div>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <div className={classes.infoTagsContainer}>
              <Chip
                    icon={<LocalOfferRoundedIcon className={classes.tagIcon} />}
                    label="No Technologies"
                    className={classes.label}
                  />
              </div>
            </Grid>
          )}

          <Grid item xs={12} className={classes.body}>
            <div className={classes.companyDescription}>
              <Typography
                style={{ whiteSpace: "pre-line" }}
                variant="body2"
                align="justify"
              >
                {description}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </FloatCard>
    </div>
      </>
    )
  }
