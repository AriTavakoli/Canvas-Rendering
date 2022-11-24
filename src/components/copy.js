
                  <ToggleButton onClick={() => { setShown(!isShown); }} >
                  <LocalLibraryOutlinedIcon style={{ fontSize: 20, }} > </LocalLibraryOutlinedIcon>
                </ToggleButton>
                <AnimatePresence>
                  {isShown && (
                    <div >
                      <motion.div
                        layout
                        className="side-bar"
                        initial={{
                          opacity: 0,
                          x: 0,
                          hidden: true,
                        }}
                        animate={{ x: '-10%', opacity: 1, hidden: false, }}
                        exit={{
                          x: 0,
                          transition: { ease: 'easeOut', duration: 0.2, },
                          hidden: true,
                          opacity: 0,


                        }}
                        transition={{ ease: 'linear', duration: .2, }}
                      >
                        <motion.div className="close-button-container">
                          <ToggleButton onClick={() => { setShown(!isShown); }}>
                            <CloseIcon style={{ fontSize: 20, }}></CloseIcon>
                          </ToggleButton>
                          <ToggleButton>
                            <LocalLibraryOutlinedIcon style={{ fontSize: 20, }} > </LocalLibraryOutlinedIcon>
                          </ToggleButton>
                        </motion.div>

                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>