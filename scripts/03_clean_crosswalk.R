# Clear the console
cat("\014")
# Remove every object in the environment
rm(list = ls())

lib <- c("dplyr", "tidyr", "maps")
#sapply(lib, function(x) install.packages(x))
sapply(lib, function(x) require(x, character.only = TRUE))

wd <- "~/Google Drive/2018 - 2019/Wharton/Academics/Fall 2018/CIS550 Data Systems/Group Project/"

# import data
cross <- read.csv(paste0(wd, "raw_data/county_zip_crosswalk.csv"), as.is = TRUE)

cross <- cross %>% select(county, zip) %>% rename(county_fips = county) 

# export the data
write.csv(cross, paste0(wd, "intermediate_data/county_zip_crosswalk.csv"), row.names = FALSE)
