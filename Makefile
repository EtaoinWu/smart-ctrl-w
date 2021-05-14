
NAME = smart_ctrl_w

FILES = background.js manifest.json icon128.png icon48.png

$(NAME).zip: $(FILES)
	mkdir $(NAME)
	cp -al $(FILES) $(NAME)
	zip -9r $(NAME) $(NAME)
	$(RM) -r $(NAME)

.PHONY: clean
clean:
	$(RM) -r $(NAME).zip $(NAME)
