FROM node

# Install sudo, fish, vim, less
RUN echo 'deb http://download.opensuse.org/repositories/shells:/fish:/release:/3/Debian_11/ /' | tee /etc/apt/sources.list.d/shells:fish:release:3.list && \
  curl -fsSL https://download.opensuse.org/repositories/shells:fish:release:3/Debian_11/Release.key | gpg --dearmor | tee /etc/apt/trusted.gpg.d/shells_fish_release_3.gpg > /dev/null
RUN apt-get update && \
  apt-get install -y sudo fish vim less && \
  apt-get clean && rm -rf /var/lib/apt/lists

USER root
RUN npm install -g npm@latest
USER ${USER}

# Config
ENV HOME=/home/${USER}
ENV PATH=${HOME}/.local/bin:${PATH}
ARG PATH_TO_BIN=${HOME}/.local/bin
RUN echo "export PATH=${PATH_TO_BIN}:\${PATH}" >> ${HOME}/.bash_profile && \
  mkdir -p ${HOME}/.config/fish && echo "set fish_user_paths ${PATH_TO_BIN} \$fish_user_paths" >> ${HOME}/.config/fish/config.fish

ENTRYPOINT ["/bin/sh", "-c", "while :; do sleep 100; done"]