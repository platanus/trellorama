#! /bin/sh

function switchBranch {
	local _ORIGINAL_BRANCH=$1
	local _TARGET_BRANCH=$2
	local ORIGINAL_BRANCH=`git branch | grep \* | cut -d ' ' -f2`
	eval $_ORIGINAL_BRANCH="'$ORIGINAL_BRANCH'"
	echo "Current branch: $ORIGINAL_BRANCH"
	if [[ $_ORIGINAL_BRANCH != $_TARGET_BRANCH ]]; then
		echo "Switching to branch: $_TARGET_BRANCH"
		git checkout $_TARGET_BRANCH
	fi
}

function deleteFiles {
	rm -rf css favicon.ico index.html js
}

function updateFiles {
	cp -r dist/* .
}

function createCommit {
	local COMMIT_MESSAGE=$1
	git add .
	git commit -m "$COMMIT_MESSAGE"
	git push
}

function help {
	echo "GitHub Pages Publisher"
	echo "Usage: publisher [-h] master_branch target_branch build_comand message"
	echo "arguments:"
	echo "\tmaster_branch: Project master branch"
	echo "\ttarget_branch: GitHub Pages branch"
	echo "\tbuild_comand: Comand that builds the project"
	echo "\tmessage: Commit message"
}

if [[ $# -lt 4 ]]; then
	help
	exit 1
fi

if [[ $1 == '-h' ]]; then
	help
	exit 0
fi

MASTER_BRANCH=$1
TARGET_BRANCH=$2
BUILD_COMAND=$3
MESSAGE=$4

switchBranch ORIGINAL_BRANCH $MASTER_BRANCH
git pull
$BUILD_COMAND
switchBranch _ $TARGET_BRANCH
deleteFiles
updateFiles
createCommit $MESSAGE
switchBranch _ $ORIGINAL_BRANCH
