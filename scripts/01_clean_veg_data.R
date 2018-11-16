# Clear the console
cat("\014")
# Remove every object in the environment
rm(list = ls())

lib <- c("dplyr", "tidyr")
#sapply(lib, function(x) install.packages(x))
sapply(lib, function(x) require(x, character.only = TRUE))

wd <- "~/Google Drive/2018 - 2019/Wharton/Academics/Fall 2018/CIS550 Data Systems/Group Project/"

# import data
veg <- read.csv(paste0(wd, "raw_data/vegetarian_restaurants_US.csv"), as.is = TRUE)

# cut to necessary columns
veg <- select(veg, "name", "city", "province", "postalCode", "lat", "long")

# rename confusing variables
veg <- rename(veg, restaurant_name = name, state = province, zip = postalCode)

# clean zipcode

# take out restaurants that are missing zip code
veg <- veg[-which(nchar(veg$zip) == 0), ]

## remove punctuations
veg$zip <- gsub("[[:punct:]]", "", veg$zip)

## pad zip codes that are missing a leading zero
pad <- which(nchar(veg$zip) == 4)
veg$zip[pad] <- sprintf("%05s", veg$zip[pad] )

## keep the zip code to the first five digits
veg$zip <- substr(veg$zip, 1, 5)

# export the data
write.csv(veg, paste0(wd, "intermediate_data/veg_restaurants.csv"), row.names = FALSE)
