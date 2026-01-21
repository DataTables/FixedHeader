#!/bin/sh

DT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../.."
if [ "$1" = "debug" ]; then
	DEBUG="debug"
else
	OUT_DIR=$1
	DEBUG=$2
fi

# If not run from DataTables build script, redirect to there
if [ -z "$DT_BUILD" ]; then
	cd $DT_DIR/build
	./make.sh extension FixedHeader $DEBUG
	cd -
	exit
fi

# Change into script's own dir
cd $(dirname $0)

DT_SRC=$(dirname $(dirname $(pwd)))
DT_BUILT="${DT_SRC}/built/DataTables"
. $DT_SRC/build/include.sh

# Copy CSS
rsync -r css $OUT_DIR
css_frameworks fixedHeader $OUT_DIR/css


# Get the version from the file
VERSION=$(grep "static version" js/dataTables.fixedHeader.ts | perl -nle'print $& if m{\d+\.\d+\.\d+(\-\w*)?}')

# JS - compile and then copy into place
$DT_SRC/node_modules/typescript/bin/tsc -p ./tsconfig.json

## Remove the import - our wrapper does it for UMD as well as ESM
sed -i "s#import DataTable from 'datatables.net';##" dist/dataTables.fixedHeader.js
sed -i "s#import DataTable from 'datatables.net';##" dist/FixedHeader.js

HEADER="/*! FixedHeader $VERSION
 * Copyright (c) SpryMedia Ltd - datatables.net/license
 */
"
$DT_SRC/node_modules/rollup/dist/bin/rollup \
    --banner "$HEADER" \
    --config rollup.config.mjs

rsync -r dist/dataTables.fixedHeader.js $OUT_DIR/js/
rsync -r js/integrations/fixedHeader.*.js $OUT_DIR/js/

js_frameworks fixedHeader $OUT_DIR/js "datatables.net-FW datatables.net-fixedheader"
js_wrap $OUT_DIR/js/dataTables.fixedHeader.js "datatables.net"

# Move types across, single file was built by rollup
if [ -d $OUT_DIR/types ]; then
	rm -r $OUT_DIR/types		
fi
mkdir $OUT_DIR/types

cp dist/types.d.ts $OUT_DIR/types
cp types/fixedHeader*.d.ts $OUT_DIR/types

rm -r dist


# Copy and build examples
rsync -r examples $OUT_DIR
examples_process $OUT_DIR/examples

# Readme and license
cp Readme.md $OUT_DIR
cp License.txt $OUT_DIR

