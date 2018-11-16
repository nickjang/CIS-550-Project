# Clear the console
cat("\014")
# Remove every object in the environment
rm(list = ls())

lib <- c("dplyr", "tidyr", "maps")
#sapply(lib, function(x) install.packages(x))
sapply(lib, function(x) require(x, character.only = TRUE))

wd <- "~/Google Drive/2018 - 2019/Wharton/Academics/Fall 2018/CIS550 Data Systems/Group Project/"

# import data
crime <- read.csv(paste0(wd, "raw_data/crime_data_w_population_and_crime_rate.csv"), as.is = TRUE)

# bring in state and county crosswalks via maps package
data(county.fips)
data(state.fips)

# add in state name via fips code
crime <- left_join(crime, state.fips[, c("fips", "polyname")], by = c("FIPS_ST" = "fips"))
crime <- rename(crime, "state_name" = "polyname")

## get rid of stupid sub-names
crime$state_name <- sub('\\s*:.*','', crime$state_name)

## add in alaska
crime$state_name[which(crime$FIPS_ST == 2)] <- "alaska"

# standarize county name
crime$county_name_new <- sub('\\s*,.*','', crime$county_name)
crime$county_name_new <- gsub("County", "", crime$county_name_new)
crime$county_name_new <- gsub("Parish", "", crime$county_name_new)
crime$county_name_new <- gsub("\\'", "", crime$county_name_new)
va <- which(crime$state_name == "virginia")
crime$county_name_new[va] <- gsub("City", "", crime$county_name_new[va], ignore.case = TRUE)


# remove leading and trailing spaces
crime$county_name_new <- gsub("^\\s+|\\s+$", "", crime$county_name_new)
crime$county_name_new <- gsub("\\.", "", crime$county_name_new)


# to lower case
crime$county_name_new <- tolower(crime$county_name_new)

# paste state and county name for the merge
crime$state_county_key <- paste0(crime$state_name, ",", crime$county_name_new)

# merge
merged <- left_join(crime,county.fips, by = c("state_county_key" = "polyname"))

# reorder columns
merged <- select(merged, state_county_key, fips, everything())

# manual fixes
merged$fips[which(merged$state_county_key == "district of columbia,district of columbia")] <- 11001

# delete fips NA counties
merged <- merged[-which(is.na(merged$fips)), ]

merged <- select(merged, -one_of(c("state_county_key", "IDNO", "index", "EDITION", "PART", "FIPS_ST", "FIPS_CTY", "state_name", "county_name_new")))

merged <- rename(merged, county_fips = fips)
# export the data
write.csv(merged, paste0(wd, "intermediate_data/crimes.csv"), row.names = FALSE)
