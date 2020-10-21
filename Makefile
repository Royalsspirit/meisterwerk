###############################################################################
#               .__          __                                     __        #
#  _____   ____ |__| _______/  |_  _____________  _  __ ___________|  | __    #
# /     \_/ __ \|  |/  ___/\   __\/ __ \_  __ \ \/ \/ // __ \_  __ \  |/ /    #
#|  Y Y  \  ___/|  |\___ \  |  | \  ___/|  | \/\     /\  ___/|  | \/    <     #
#|__|_|  /\___  >__/____  > |__|  \___  >__|    \/\_/  \___  >__|  |__|_ \    #
#      \/     \/        \/            \/                   \/           \/    #
#       								      #
###############################################################################      



.DEFAULT_GOAL := up

.PHONY: up down clean

# run production env
up:
	docker-compose  -f docker-compose.yml -f build/production/docker-compose.yml up

# stop running production env
down: 
	docker-compose  -f docker-compose.yml -f build/production/docker-compose.yml down

# clean all project dependencies
clean:
	docker-compose -f docker-compose.yml -f build/production/docker-compose.yml down --rmi all


help: Makefile
	@echo 
	@echo " Choose a command run in ${PROJECT_NAME}"
	@echo
	@sed -n 's/^#help//p' $< | column -t -s ':' |  sed -e 's/^/ /'
	@echo
