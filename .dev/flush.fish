#!/opt/homebrew/bin/fish

if test (uname) != Darwin; or not functions -q gum
    echo "Error: This script requires macOS and Chip's 'gum' wrapper function fish script."
    echo "https://github.com/fractalcounty/dotfiles/blob/main/config/fish/functions/alias/gum.fish"
    exit 1
end

# Change to the project root directory
cd (dirname (status -f))/../

set -l targets \
    node_modules/ \
    ".astro/" \
    dist/ \
    build/ \
    "bun.lockb"

set -l existing_targets

for target in $targets
    if test -e "$target"
        set -a existing_targets $target
    end
end

if test (count $existing_targets) -eq 0
    gum log -l warn "No targets found to flush."
    exit 0
end

gum style -th prompt "The following paths will be regenerated:"

for target in $existing_targets
    echo -n "• "
    gum style -th code "$target"
end

echo

if not gum confirm -th alt "Remove and regenerate?"
    gum log -l warn "Operation cancelled."
    exit 0
end

for target in $existing_targets
    if test -d "$target"
        gum spin --title "Removing directory $target..." -- rm -rf "$target"
    else
        gum spin --title "Removing file $target..." -- rm -f "$target"
    end
    gum log -l debug "Removed $target"
end

if contains node_modules/ $existing_targets
    gum spin --title "Reinstalling dependencies..." -- bun install
end

if contains ".astro/" $existing_targets
    gum spin --title "Syncing Astro..." -- bun run astro sync
end

gum log -l info "Flush complete."
gum log -l info "You may want to run your build or static generate commands now."
