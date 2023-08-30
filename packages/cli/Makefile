DEPTH=.
.ONESHELL:
.SHELLFLAGS:=-eu -o pipefail -c
MAKEFLAGS+=--warn-undefined-variables
SCRIPTS_DIR=scripts
START_TOKEN_ID:=1
START_PAGE:=
END_PAGE:=
ASSET_DIR?=$(error ASSET_DIR must be set)
URL?=$(error URL must be set)
PDF_FILENAME=$(shell basename $(URL))
OUTPUT_DIR:=library/$(basename $(PDF_FILENAME))
DESCRIPTION?=$(error DESCRIPTION must be set)
OUTPUT_PATTERN=$(basename $(PDF_FILENAME))-%04d.webp
CID:=

.PHONY: all
all: $(OUTPUT_DIR)/images store-images write-metadata store-metadata

.PHONY: reserve-and-propose
reserve-and-propose: hash-pdf create-nft-images store-nft-images write-metadata store-metadata
	@METADATA_URL=`jq '.url' $(OUTPUT_DIR)/nft.json`; \
	echo reserve url: `cat $(OUTPUT_DIR)/source.dat | awk '{print $$1}'`; \
	echo reserve book hash: `cat $(OUTPUT_DIR)/bookhash.dat | awk '{print "0x"$$1}'`; \
	echo reserve page count: `ls -1 $(OUTPUT_DIR)/images/ | wc -l`; \
	echo propose car uri: $$METADATA_URL/{id}.json | sed -r 's/["]//g'

# Write NFT metadata directory to NFT.storage as CAR file
.PHONY: store-metadata
store-metadata: $(OUTPUT_DIR)/metadata
	@echo '***** UPLOAD NFT METADATA TO NFT.STORAGE *****'
	node $(SCRIPTS_DIR)/storeDirectory.mjs $^ 2>&1 | tee $(OUTPUT_DIR)/nft.json

# Write NFT metadata from START_PAGE to END_PAGE
write-metadata:
	@echo '***** CREATE NFT METADATA *****'
	CID=`jq '.cid' $(OUTPUT_DIR)/images.cid`; \
		node $(SCRIPTS_DIR)/buildJsonFiles.mjs "$(DESCRIPTION)" \
			"$(OUTPUT_PATTERN)" \
			$(START_PAGE) $(END_PAGE) \
			$(START_TOKEN_ID) \
			$$CID \
			$(OUTPUT_DIR)/metadata

# Store images on NFT.storage and get CAR file cid
.PHONY: store-nft-images
store-nft-images:
	@echo '***** UPLOAD NFTS TO NFT.STORAGE *****'
	node $(SCRIPTS_DIR)/storeDirectory.mjs $(OUTPUT_DIR)/images 2>&1 | tee $(OUTPUT_DIR)/images.cid

# Convert PDF to images from START_PAGE to END_PAGE
.PHONY: create-images
create-nft-images: $(OUTPUT_DIR)/images
$(OUTPUT_DIR)/images: $(OUTPUT_DIR)/$(PDF_FILENAME)
	@echo '***** CREATE NFT IMAGES *****'
	mkdir -p $@ && \
		convert $(OUTPUT_DIR)/$(PDF_FILENAME)[$(START_PAGE)-$(END_PAGE)] -density 300 -depth 8 -quality 90 -colorspace RGB $@/$(basename $(PDF_FILENAME))-%04d.webp

# Create book hash
.PHONY: hash-pdf
hash-pdf: $(OUTPUT_DIR)/bookhash.dat
$(OUTPUT_DIR)/bookhash.dat: $(OUTPUT_DIR)/$(PDF_FILENAME)
	@echo '***** COMPUTE BOOK HASH *****'
	sha256sum $(OUTPUT_DIR)/$(PDF_FILENAME) | tee $@

# Grab pdf at URL
.PHONY: fetch-url
fetch-url: $(OUTPUT_DIR)/$(PDF_FILENAME)
$(OUTPUT_DIR)/$(PDF_FILENAME): $(OUTPUT_DIR)
	@echo '***** FETCH URL *****'
	curl -L -s -o $@ $(URL); echo $(URL) > $(OUTPUT_DIR)/source.dat

# Create the output directory
$(OUTPUT_DIR):
	mkdir -p $@
